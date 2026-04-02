import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CohortCountdown from "./components/CohortCountdown";
import Ticker from "./components/Ticker";
import Curriculum from "./components/Curriculum";
import OSSection from "./components/OSSection";
import Internship from "./components/Internship";
import PlacementReady from "./components/PlacementReady";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import { CTABanner, Footer } from "./components/FooterCTA";

import {
  navLinks,
  tickerItems,
  modules,
  osFeatures,
  internshipSteps,
  pricingTiers,
  testimonials,
  faqs,
} from "./data/siteData";

export default function App() {
  return (
    <div
      className="bg-[#050810] text-[#e8edf5] min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Grid overlay — full viewport */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Same width as rest of site: full on mobile, centered ~80% from md */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] min-w-0 md:w-[80%]">
        <Navbar links={navLinks} />

        <main className="relative z-10">
          <Hero />
          <CohortCountdown />
          <Ticker items={tickerItems} />
          <Curriculum modules={modules} />
          <OSSection features={osFeatures} />
          <Internship steps={internshipSteps} />
          <PlacementReady />
          <Pricing tiers={pricingTiers} />
          <Testimonials testimonials={testimonials} />
          <FAQ items={faqs} />
          <CTABanner />
        </main>

        <Footer />
      </div>
    </div>
  );
}
