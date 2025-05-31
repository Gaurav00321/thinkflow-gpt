import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Activity } from "lucide-react"

export function ApiUsage() {
  return (
    <section className="container relative py-12">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
      <div className="absolute inset-0">
        <div className="absolute bottom-1/4 -right-1/2 w-full aspect-square bg-purple-900/20 rounded-full blur-3xl animate-pulse opacity-30" />
      </div>

      <div className="relative mx-auto max-w-[58rem]">
        <div className="flex items-center gap-3 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-xl bg-purple-600/10 p-2 ring-1 ring-purple-500/20"
          >
            <Activity className="h-8 w-8 text-purple-400" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400"
          >
            Rate Limits & Usage
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <Card className="border-purple-500/20 bg-black/40 backdrop-blur-sm overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
            <CardHeader>
              <CardTitle className="text-xl text-purple-50">Rate Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-purple-200 mb-3">Pro Plan</h3>
                <ul className="list-disc pl-6 space-y-2 text-purple-100/80">
                  <li>50,000 API requests per month</li>
                  <li>10 requests per minute</li>
                  <li>Maximum 4,096 tokens per request</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-purple-200 mb-3">Enterprise Plan</h3>
                <ul className="list-disc pl-6 space-y-2 text-purple-100/80">
                  <li>Unlimited API requests</li>
                  <li>100 requests per minute</li>
                  <li>Maximum 8,192 tokens per request</li>
                  <li>Custom rate limits available</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Alert className="border-purple-500/20 bg-purple-950/20 backdrop-blur-sm">
              <AlertTriangle className="h-5 w-5 text-purple-400" />
              <AlertTitle className="text-purple-200">Rate Limit Exceeded</AlertTitle>
              <AlertDescription className="text-purple-100/80">
                If you exceed your rate limit, the API will return a 429 Too Many Requests error. Consider upgrading your
                plan or implementing retry logic with exponential backoff.
              </AlertDescription>
            </Alert>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

