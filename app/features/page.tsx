import type { Metadata } from "next";
import FeatureHero from "@/components/features/feature-hero";
import FeatureGrid from "@/components/features/feature-grid";
import FeatureShowcase from "@/components/features/feature-showcase";
import FeatureCta from "@/components/features/feature-cta";
import FloatingChatButton from "@/components/features/floating-chat-button";
import ParticleBackground from "@/components/features/particle-background";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "ThinkFlowGPT Features | AI-Powered Workflow Automation",
  description:
    "Discover the powerful features of ThinkFlowGPT: AI-Powered Chat, Code Assistance, Workflow Automation, Business Dashboard, and more.",
};

export default function FeaturesPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Dynamic background */}
      <ParticleBackground />

      <Navbar />

      {/* Add padding to account for fixed navbar */}
      <div className="pt-16">
        {/* Hero section */}
        <FeatureHero />

        {/* Feature grid */}
        <FeatureGrid />

        {/* Detailed feature showcases */}
        <FeatureShowcase />

        {/* CTA section */}
        <FeatureCta />

        {/* Floating chat button */}
        <FloatingChatButton />

        <Footer />
      </div>
    </main>
  );
}
