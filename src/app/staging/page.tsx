"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CosmicBackground from "@/components/CosmicBackground";
import Hero from "./_components/Hero";
import About from "./_components/About";
import JourneyTimeline from "./_components/JourneyTimeline";
import HeroOutcomes from "./_components/HeroOutcomes";
import VisionMission from "./_components/VisionMission";
import CTASection from "./_components/CTASection";

export default function Home() {
  return (
    <main className="relative">
      <CosmicBackground />
      <Navbar />
      
      <Hero />
      <About />
      <JourneyTimeline />
      
      {/* Vision & Mission Section */}
      <VisionMission />

      {/* Output Section */}
      <HeroOutcomes />

      {/* CTA Closing Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
