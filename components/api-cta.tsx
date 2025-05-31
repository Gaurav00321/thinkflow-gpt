import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Rocket } from "lucide-react"

export function ApiCTA() {
  return (
    <section className="container py-12 md:py-24 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent" />
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0.3, scale: 0.8 }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-1/4 -left-1/2 w-full aspect-square bg-purple-900/20 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
          className="absolute bottom-1/4 -right-1/2 w-full aspect-square bg-purple-800/20 rounded-full blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-[58rem] relative">
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-purple-500/20 bg-black/40 backdrop-blur-sm overflow-hidden group hover:bg-black/50 transition-colors h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-xl bg-purple-600/10 p-2 ring-1 ring-purple-500/20">
                    <Code className="h-5 w-5 text-purple-400" />
                  </div>
                  <CardTitle className="text-xl text-purple-50 group-hover:text-white transition-colors">
                    Get Your API Key
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-purple-100/80 group-hover:text-purple-100/90 transition-colors">
                  Subscribe to our Pro or Enterprise plan to get access to the ThinkFlowGPT API. Generate your API key
                  from your dashboard and start integrating AI into your applications.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/pricing" className="w-full">
                  <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white">View Pricing</Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-purple-500/20 bg-black/40 backdrop-blur-sm overflow-hidden group hover:bg-black/50 transition-colors h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-xl bg-purple-600/10 p-2 ring-1 ring-purple-500/20">
                    <Rocket className="h-5 w-5 text-purple-400" />
                  </div>
                  <CardTitle className="text-xl text-purple-50 group-hover:text-white transition-colors">
                    Need Help?
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-purple-100/80 group-hover:text-purple-100/90 transition-colors">
                  Our team is ready to help you integrate ThinkFlowGPT into your applications. Contact us for custom
                  solutions, enterprise pricing, or technical support.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/contact" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border-purple-500/30 hover:bg-purple-600/10 text-purple-100 hover:text-white"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

