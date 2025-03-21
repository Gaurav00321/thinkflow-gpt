import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PricingPlans } from "@/components/pricing-plans"
import { PricingFAQ } from "@/components/pricing-faq"
import { PricingCTA } from "@/components/pricing-cta"

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-4 max-w-[85%] text-muted-foreground sm:text-xl">
              Choose the plan that's right for you and start transforming your workflow with ThinkFlowGPT.
            </p>
          </div>
        </section>
        <PricingPlans />
        <PricingFAQ />
        <PricingCTA />
      </main>
      <Footer />
    </div>
  )
}

