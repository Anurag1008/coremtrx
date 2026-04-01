import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import type { CheckoutCourse } from "../types";
import { checkoutCourses } from "../data/checkoutCourses";
import { SystemsInternSyllabus } from "../components/SystemsInternSyllabus";

type LeadState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

function useQuery() {
  const location = useLocation();
  return useMemo(() => new URLSearchParams(location.search), [location.search]);
}

function formatMoneyINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Backend may return { message, detail, hint } — show all in the UI */
function apiErr(json: { message?: string; detail?: string; hint?: string }) {
  return [json.message, json.detail, json.hint].filter(Boolean).join(" — ");
}

export default function CheckoutPage() {
  const { courseId } = useParams();
  const query = useQuery();
  const priceId = query.get("priceId") ?? undefined;

  const course: CheckoutCourse | undefined = courseId ? checkoutCourses[courseId] : undefined;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<LeadState>({ status: "idle" });

  const effectivePrice = course?.pricing?.priceInINR ?? 0;
  const effectiveDiscount = course?.pricing?.discountInINR ?? 0;
  const toPay = Math.max(0, effectivePrice - effectiveDiscount);

  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-razorpay="checkout"]');
    if (existing) return;
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.dataset.razorpay = "checkout";
    document.body.appendChild(script);
  }, []);

  async function createOrderAndPay(leadIdValue: number) {
    const res = await fetch("/api/razorpay_order.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadId: leadIdValue,
        courseId: course?.id ?? courseId ?? "unknown",
      }),
    });
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error(`Server did not return JSON. Got: ${text.slice(0, 200)}`);
    }
    const json = (await res.json()) as {
      ok?: boolean;
      message?: string;
      hint?: string;
      keyId?: string;
      orderId?: string;
      amountPaise?: number;
      currency?: string;
      courseName?: string;
    };
    if (!res.ok || !json.ok || !json.keyId || !json.orderId || !json.amountPaise) {
      throw new Error(apiErr(json) || "Failed to start payment.");
    }

    const w = window as unknown as {
      Razorpay?: new (opts: any) => { open: () => void };
    };
    if (!w.Razorpay) {
      throw new Error("Payment SDK not loaded yet. Please try again.");
    }

    const rz = new w.Razorpay({
      key: json.keyId,
      amount: json.amountPaise,
      currency: json.currency || "INR",
      name: "CoreMtrx",
      description: json.courseName || course?.title || "Course enrollment",
      order_id: json.orderId,
      prefill: {
        name,
        email,
        contact: phone,
      },
      notes: {
        lead_id: String(leadIdValue),
        course_id: course?.id ?? courseId ?? "",
      },
      theme: { color: "#22d3ee" },
      handler: async (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => {
        const verifyRes = await fetch("/api/razorpay_verify.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leadId: leadIdValue,
            ...response,
          }),
        });
        const verifyJson = (await verifyRes.json()) as { ok?: boolean; message?: string; hint?: string };
        if (!verifyRes.ok || !verifyJson.ok) {
          setState({ status: "error", message: apiErr(verifyJson) || "Payment verification failed." });
          return;
        }
        setState({ status: "success", message: "Payment successful. Check your email/WhatsApp for onboarding." });
      },
      modal: {
        ondismiss: () => {
          setState({ status: "idle" });
        },
      },
    });

    rz.open();
  }

  async function submitLead() {
    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/lead.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course?.id ?? courseId ?? "unknown",
          courseTitle: course?.title ?? "Unknown course",
          priceId,
          amountInINR: toPay,
          name,
          email,
          phone,
        }),
      });

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Server did not return JSON. Got: ${text.slice(0, 200)}`);
      }

      const json = (await res.json()) as { ok?: boolean; message?: string; hint?: string; leadId?: number };
      if (!res.ok || !json.ok) {
        throw new Error(apiErr(json) || "Failed to submit. Please try again.");
      }

      const newLeadId = typeof json.leadId === "number" ? json.leadId : null;
      if (!newLeadId) {
        throw new Error("Lead saved but missing id. Please try again.");
      }

      await createOrderAndPay(newLeadId);
    } catch (e) {
      setState({ status: "error", message: e instanceof Error ? e.message : "Something went wrong." });
    }
  }

  const canSubmit =
    state.status !== "submitting" &&
    name.trim().length >= 2 &&
    /^\S+@\S+\.\S+$/.test(email.trim()) &&
    phone.trim().length >= 8 &&
    Boolean(course);

  return (
    <div className="min-h-screen bg-[#050810] text-[#e8edf5]">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto w-[80%] max-w-[1600px] min-w-0">
      <header className="relative z-10 border-b border-[#1e2d45] bg-[#050810]/85 backdrop-blur-xl">
        <div className="px-4 sm:px-6 h-[70px] flex items-center justify-between">
          <Link to="/" className="font-[Syne] font-extrabold text-2xl tracking-tight text-white no-underline">
            Core<span className="text-cyan-400">Mtrx</span>
          </Link>
          <Link
            to="/#pricing"
            className="font-mono text-[0.72rem] tracking-widest text-[#6b7a99] hover:text-cyan-400 transition-colors duration-200 no-underline"
          >
            BACK TO PRICING
          </Link>
        </div>
      </header>

      <main className="relative z-10 px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: course content */}
          <section className="bg-[#070b14] border border-[#1e2d45] rounded-lg overflow-hidden">
            <div className="p-7">
              <p className="font-mono text-[0.72rem] tracking-widest text-[#6b7a99] uppercase">
                {course?.badge ?? "Checkout"}
              </p>
              <h1 className="font-[Syne] text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
                {course?.title ?? "Course not found"}
              </h1>
              {course?.subtitle && <p className="text-[#9fb0cc] mt-3 leading-relaxed">{course.subtitle}</p>}

              {!course ? (
                <div className="mt-6 text-[#9fb0cc]">
                  The selected course doesn’t exist. Go back and choose a plan again.
                </div>
              ) : (
                <>
                  <div className="mt-6 space-y-2 text-[#9fb0cc]">
                    {course.notes.map((n, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>{n}</span>
                      </div>
                    ))}
                  </div>

                  {course.syllabusLinks?.length ? (
                    <div className="mt-7">
                      <p className="font-mono text-[0.75rem] tracking-widest text-[#6b7a99] uppercase mb-3">
                        Syllabus
                      </p>
                      <div className="flex flex-col gap-2">
                        {course.syllabusLinks.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-400 hover:text-white transition-colors no-underline text-sm"
                          >
                            {l.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {course.detailedModules?.length ? (
                    <SystemsInternSyllabus
                      modules={course.detailedModules}
                      internshipSection={course.internshipSection}
                    />
                  ) : course.outline?.length ? (
                    <div className="mt-8">
                      <p className="font-mono text-[0.75rem] tracking-widest text-[#6b7a99] uppercase mb-3">
                        Course content
                      </p>
                      <div className="space-y-4">
                        {course.outline.map((block) => (
                          <div key={block.title} className="bg-[#0b1120] border border-white/5 rounded-md p-4">
                            <div className="font-semibold">{block.title}</div>
                            <ul className="mt-2 ml-5 list-disc text-sm text-[#9fb0cc] space-y-1">
                              {block.items.map((it) => (
                                <li key={it}>{it}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </section>

          {/* Right: payment */}
          <aside className="bg-[#070b14] border border-[#1e2d45] rounded-lg p-7">
            <p className="font-mono text-[0.8rem] tracking-widest text-[#6b7a99] uppercase mb-4">Payment Details</p>

            <div className="bg-[#0b1120] border border-white/5 rounded-md p-4">
              <div className="text-sm text-[#9fb0cc] mb-3">Your account</div>

              <div className="space-y-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="w-full bg-transparent border border-[#1e2d45] rounded-md px-3 py-2 text-sm outline-none focus:border-cyan-400"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                  className="w-full bg-transparent border border-[#1e2d45] rounded-md px-3 py-2 text-sm outline-none focus:border-cyan-400"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Mobile number"
                  inputMode="tel"
                  className="w-full bg-transparent border border-[#1e2d45] rounded-md px-3 py-2 text-sm outline-none focus:border-cyan-400"
                />
                <div className="text-xs text-[#6b7a99]">We’ll use this to share payment confirmation and onboarding.</div>
              </div>
            </div>

            <div className="mt-5 bg-[#0b1120] border border-white/5 rounded-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">{course?.pricing?.planName ?? "Base plan"}</div>
                  <div className="text-xs text-[#6b7a99]">{course?.pricing?.validityNote ?? "Validity as per plan"}</div>
                </div>
                {course?.pricing?.detailsHref ? (
                  <a
                    className="text-xs text-cyan-400 hover:text-white transition-colors no-underline"
                    href={course.pricing.detailsHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Details
                  </a>
                ) : (
                  <span className="text-xs text-[#6b7a99]"> </span>
                )}
              </div>
            </div>

            <div className="mt-5 bg-[#0b1120] border border-white/5 rounded-md p-4">
              <div className="text-sm font-semibold mb-3">Bill summary</div>
              <div className="flex items-center justify-between text-sm text-[#9fb0cc]">
                <span>Product total</span>
                <span>{formatMoneyINR(effectivePrice)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-[#9fb0cc] mt-2">
                <span>Discount</span>
                <span className={effectiveDiscount ? "text-emerald-400" : ""}>
                  {effectiveDiscount ? `- ${formatMoneyINR(effectiveDiscount)}` : formatMoneyINR(0)}
                </span>
              </div>
              <div className="h-px bg-white/10 my-3" />
              <div className="flex items-center justify-between font-semibold">
                <span>To pay</span>
                <span>{formatMoneyINR(toPay)}</span>
              </div>
            </div>

            <button
              disabled={!canSubmit}
              onClick={submitLead}
              className="mt-5 w-full font-mono text-[0.85rem] tracking-wider font-bold py-3.5 text-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-[#8a4a16] hover:bg-[#a65a1d] text-white rounded-md"
            >
              {state.status === "submitting" ? "STARTING PAYMENT..." : `PAY ${formatMoneyINR(toPay)}`}
            </button>

            {state.status === "success" ? (
              <div className="mt-4 text-sm text-emerald-400">{state.message}</div>
            ) : null}
            {state.status === "error" ? (
              <div className="mt-4 text-sm text-rose-400">{state.message}</div>
            ) : null}

            <div className="mt-6 text-center text-xs text-[#6b7a99]">
              By continuing you agree to our{" "}
              <a className="text-[#9fb0cc] hover:text-white transition-colors" href="#" onClick={(e) => e.preventDefault()}>
                Terms
              </a>{" "}
              &{" "}
              <a className="text-[#9fb0cc] hover:text-white transition-colors" href="#" onClick={(e) => e.preventDefault()}>
                Refund Policy
              </a>
              .
            </div>
          </aside>
        </div>
      </main>
      </div>
    </div>
  );
}

