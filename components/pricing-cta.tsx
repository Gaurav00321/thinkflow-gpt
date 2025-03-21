import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PricingCTA() {
  return (
    <section className="container py-12 md:py-24">
      <div className="mx-auto max-w-[58rem] rounded-lg bg-primary/10 p-8 text-center">
        <h2 className="mb-4 text-3xl font-bold">Ready to transform your workflow?</h2>
        <p className="mb-8 text-muted-foreground">
          Join thousands of businesses and students who are already using ThinkFlowGPT to enhance their productivity.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/chat">
            <Button size="lg" className="h-12 px-8">
              Try for free
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="h-12 px-8">
              Contact sales
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

