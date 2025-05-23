import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PricingCTA() {
  return (    <section className="container relative py-12 md:py-24">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] aspect-square rounded-full bg-purple-900/10 blur-3xl" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[70%] aspect-square rounded-full bg-purple-800/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[58rem] rounded-2xl border border-purple-500/20 bg-black/40 backdrop-blur-xl p-12 text-center">
        <h2 className="mb-4 text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-purple-400 to-purple-600">
          Ready to Transform Your Workflow?
        </h2>
        <p className="mb-8 text-lg text-purple-200/80">
          Join thousands of businesses and students who are already using ThinkFlowGPT to enhance their productivity.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/chat">
            <Button 
              size="lg" 
              className="h-12 px-8 bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-500/30 transition-all duration-300"
            >
              Try for Free
            </Button>
          </Link>
          <Link href="/contact">
            <Button 
              variant="outline" 
              size="lg" 
              className="h-12 px-8 border-purple-500/30 hover:bg-purple-800/60 transition-all duration-300"
            >
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

