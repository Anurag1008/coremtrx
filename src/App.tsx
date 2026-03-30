import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Pillars from "./components/Pillars";
import Curriculum from "./components/Curriculum";
import OSSection from "./components/OSSection";
import Internship from "./components/Internship";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import { CTABanner, Footer } from "./components/FooterCTA";

import {
  navLinks,
  heroStats,
  tickerItems,
  pillars,
  modules,
  osFeatures,
  internshipSteps,
  pricingTiers,
  testimonials,
  faqs,
} from "./data/siteData";

export default function App() {
  return (
    <div className="bg-[#050810] text-[#e8edf5] min-h-screen overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <Navbar links={navLinks} />

      <main className="relative z-10">
        <Hero stats={heroStats} />
        <Ticker items={tickerItems} />
        <Pillars pillars={pillars} />
        <Curriculum modules={modules} />
        <OSSection features={osFeatures} />
        <Internship steps={internshipSteps} />
        <Pricing tiers={pricingTiers} />
        <Testimonials testimonials={testimonials} />
        <FAQ items={faqs} />
        <CTABanner />
      </main>

      <Footer />
    </div>
  );
}
