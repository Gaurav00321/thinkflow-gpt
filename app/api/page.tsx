import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ApiOverview } from "@/components/api-overview"
import { ApiEndpoints } from "@/components/api-endpoints"
import { ApiAuthentication } from "@/components/api-authentication"
import { ApiUsage } from "@/components/api-usage"
import { ApiCTA } from "@/components/api-cta"

export default function ApiPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
              ThinkFlowGPT API
            </h1>
            <p className="mt-4 max-w-[85%] text-muted-foreground sm:text-xl">
              Integrate AI-powered capabilities directly into your applications with our robust API.
            </p>
          </div>
        </section>
        <ApiOverview />
        <ApiAuthentication />
        <ApiEndpoints />
        <ApiUsage />
        <ApiCTA />
      </main>
      <Footer />
    </div>
  )
}

