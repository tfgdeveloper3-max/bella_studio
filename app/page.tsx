"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BentoSection from "@/components/sections/BentoSection";
import HeroSection from "@/components/sections/hero";
import PricingSection from "@/components/sections/pricingSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ShowcaseSection from "@/components/sections/Showcasesection";
import StudioShowcase from "@/components/sections/StudioShowcase";

export default function Home() {

  return (
    <main>
      <Navbar />
      <HeroSection />
      <StudioShowcase />
      <BentoSection />
      <ShowcaseSection />
      <ServicesSection />
      <PricingSection />
      <Footer />
    </main>
  );
}