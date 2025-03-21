import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function ApiCTA() {
  return (
    <section className="container py-12 md:py-24">
      <div className="mx-auto max-w-[58rem]">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Get Your API Key</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Subscribe to our Pro or Enterprise plan to get access to the ThinkFlowGPT API. Generate your API key
                from your dashboard and start integrating AI into your applications.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/pricing" className="w-full">
                <Button className="w-full">View Pricing</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our team is ready to help you integrate ThinkFlowGPT into your applications. Contact us for custom
                solutions, enterprise pricing, or technical support.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/contact" className="w-full">
                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

