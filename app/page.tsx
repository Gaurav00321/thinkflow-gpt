import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import FeatureGrid from "@/components/features/feature-grid";
import AgentSection from "@/components/agent-section";
import { SparklesCore } from "@/components/sparkles";
import { AuthCodeRedirector } from "@/components/auth/auth-code-redirector";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <AuthCodeRedirector />
      <Navbar />      <main className="flex-1">
        <HeroSection />
        <AgentSection />
        <FeatureGrid />
          <section className="container py-12 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
          {/* Dynamic workflow background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/90 to-black">
            <SparklesCore
              id="workflowSparkles"
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={40}
              className="w-full h-full opacity-50"
              particleColor="#8B5CF6"
            />
            <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          </div>
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-[1.1] text-white px-4">
              Ready to transform your workflow?
            </h2>
            <p className="max-w-[85%] leading-normal text-gray-300 sm:text-lg sm:leading-7 px-4">
              Join thousands of businesses and students who are already using
              ThinkFlowGPT to enhance their productivity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 w-full px-4 sm:px-0">              <Link href="/chat" className="w-full sm:w-auto group">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-full shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  Try for free
                </Button>
              </Link>
              <Link href="/pricing" className="w-full sm:w-auto group">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 border-purple-500 hover:border-purple-400 hover:bg-purple-500/20 text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-purple-500/20"
                >
                  View pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
