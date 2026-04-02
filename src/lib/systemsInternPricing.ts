/** Systems Intern: pay ₹4,999 (list MRP ₹9,999). */

export const SYSTEMS_INTERN_MRP_INR = 9999;
export const SYSTEMS_INTERN_PROMO_PRICE_INR = 4999;
/** Same as promo — no post-deadline price bump. */
export const SYSTEMS_INTERN_REGULAR_PRICE_INR = 4999;

export function getSystemsInternPriceInfo(_nowMs: number = Date.now()) {
  const mrpInr = SYSTEMS_INTERN_MRP_INR;
  const toPayInr = SYSTEMS_INTERN_PROMO_PRICE_INR;
  const discountInr = mrpInr - toPayInr;
  return {
    mrpInr,
    toPayInr,
    discountInr,
    /** Reserved for time-limited campaigns; false = stable ₹4,999. */
    promoActive: false,
    promoEndsAtMs: 0,
  };
}

/** Remaining time until promo ends; zeros if inactive or past. */
export function getPromoCountdownParts(nowMs: number) {
  const { promoActive, promoEndsAtMs } = getSystemsInternPriceInfo(nowMs);
  if (!promoActive) {
    return { days: 0, hours: 0, mins: 0, secs: 0, active: false };
  }
  const diff = Math.max(0, promoEndsAtMs - nowMs);
  const secsTotal = Math.floor(diff / 1000);
  return {
    days: Math.floor(secsTotal / 86400),
    hours: Math.floor((secsTotal % 86400) / 3600),
    mins: Math.floor((secsTotal % 3600) / 60),
    secs: secsTotal % 60,
    active: true,
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function formatPromoCountdown(nowMs: number): string {
  const p = getPromoCountdownParts(nowMs);
  if (!p.active) return "";
  return `${p.days}d ${pad(p.hours)}:${pad(p.mins)}:${pad(p.secs)}`;
}
