"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BentoSection from "@/components/sections/BentoSection";
import HeroSection from "@/components/sections/hero";
import PricingSection from "@/components/sections/pricingSection";
import ShowcaseSection from "@/components/sections/Showcasesection";

export default function Home() {

  return (
    <main>
      <Navbar />
      <HeroSection />
      <BentoSection />
      <ShowcaseSection />
      <PricingSection />
      <Footer />
    </main>
  );
}