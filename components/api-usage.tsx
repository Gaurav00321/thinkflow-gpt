import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export function ApiUsage() {
  return (
    <section className="container py-12">
      <div className="mx-auto max-w-[58rem]">
        <h2 className="mb-8 text-3xl font-bold">Rate Limits & Usage</h2>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Rate Limits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Pro Plan</h3>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>50,000 API requests per month</li>
                  <li>10 requests per minute</li>
                  <li>Maximum 4,096 tokens per request</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium">Enterprise Plan</h3>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Unlimited API requests</li>
                  <li>100 requests per minute</li>
                  <li>Maximum 8,192 tokens per request</li>
                  <li>Custom rate limits available</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Rate Limit Exceeded</AlertTitle>
          <AlertDescription>
            If you exceed your rate limit, the API will return a 429 Too Many Requests error. Consider upgrading your
            plan or implementing retry logic with exponential backoff.
          </AlertDescription>
        </Alert>
      </div>
    </section>
  )
}

