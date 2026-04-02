export function CTABanner() {
  return (
    <section className="relative text-center px-4 sm:px-6 py-24 overflow-hidden border-t border-b border-[#1e2d45]"
      style={{ background: "linear-gradient(135deg, #0a1a2e, #050c1a)" }}>
      {/* Watermark */}
      <span
        className="absolute font-[Syne] font-extrabold pointer-events-none select-none"
        style={{
          fontSize: "clamp(5rem, 20vw, 14rem)",
          color: "rgba(0,229,255,0.03)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
          letterSpacing: "-5px",
        }}
      >
        COREMTRX
      </span>

      <h2
        className="font-[Syne] font-extrabold mb-4 relative z-10"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        Ready to Build<br />
        From the <span className="text-cyan-400">Core?</span>
      </h2>
      <p className="text-[#9fb0cc] font-light mb-10 text-base relative z-10 max-w-md mx-auto leading-relaxed">
        Cohort lectures begin April 2026. Enroll once, keep the material for life — and ship a mini OS you can show in interviews.
      </p>
      <a
        href="#pricing"
        className="relative z-10 inline-block font-mono text-[0.85rem] tracking-wider font-bold px-12 py-5 bg-cyan-400 text-black no-underline transition-all duration-200 hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
        style={{ clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)" }}
      >
        VIEW PLANS &amp; ENROLL →
      </a>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-black border-t border-[#1e2d45] px-4 sm:px-6 py-8 flex flex-wrap justify-between items-center gap-6">
      <span className="font-[Syne] font-extrabold text-xl text-white">
        Core<span className="text-cyan-400">Mtrx</span>
      </span>
      <p className="font-mono text-[0.65rem] tracking-widest text-[#6b7a99]">
        © 2026 COREMTRX. ALL RIGHTS RESERVED.
      </p>
      <div className="flex gap-6">
        {["TWITTER", "DISCORD", "LINKEDIN", "CONTACT"].map((link) => (
          <a
            key={link}
            href={link === "CONTACT" ? "mailto:hello@coremtrx.in" : "#"}
            className="font-mono text-[0.65rem] tracking-widest text-[#6b7a99] no-underline transition-colors duration-200 hover:text-cyan-400"
          >
            {link}
          </a>
        ))}
      </div>
    </footer>
  );
}
