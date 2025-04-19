import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/hero-section";
import { Features } from "@/components/features";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <Features />
        <section className="container py-24 sm:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/[0.96] bg-grid-white/[0.02]"></div>
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center relative z-10">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl text-white">
              Ready to transform your workflow?
            </h2>
            <p className="max-w-[85%] leading-normal text-gray-300 sm:text-lg sm:leading-7">
              Join thousands of businesses and students who are already using
              ThinkFlowGPT to enhance their productivity.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Link href="/chat">
                <Button
                  size="lg"
                  className="h-12 px-8 bg-purple-600 hover:bg-purple-700 rounded-full shadow-lg shadow-purple-500/30"
                >
                  Try for free
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 border-purple-500 hover:bg-purple-500/20 text-white rounded-full"
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
