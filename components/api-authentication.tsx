import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Lock, Key } from "lucide-react"

export function ApiAuthentication() {
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
            <Lock className="h-8 w-8 text-purple-400" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400"
          >
            Authentication
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-purple-500/20 bg-black/40 backdrop-blur-sm overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-purple-50">API Key Authentication</CardTitle>
                <Badge variant="outline" className="bg-purple-600/10 text-purple-200 border-purple-500/30">
                  Required
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-purple-100/80">
                All API requests must include your API key in the Authorization header. Keep your API keys secure and never expose them in client-side code.
              </p>
              <Tabs defaultValue="curl" className="relative">
                <TabsList className="w-full justify-start mb-4 bg-purple-950/20 border border-purple-500/20">
                  <TabsTrigger value="curl" className="data-[state=active]:bg-purple-600/20">cURL</TabsTrigger>
                  <TabsTrigger value="javascript" className="data-[state=active]:bg-purple-600/20">JavaScript</TabsTrigger>
                  <TabsTrigger value="python" className="data-[state=active]:bg-purple-600/20">Python</TabsTrigger>
                </TabsList>
                <TabsContent value="curl" className="mt-0">
                  <pre className="rounded-lg bg-black/60 border border-purple-500/20 p-4 overflow-x-auto">
                    <code className="text-purple-100/90">{`curl -X POST https://api.thinkflowgpt.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello, how are you?"}
    ]
  }'`}</code>
                  </pre>
                </TabsContent>
                <TabsContent value="javascript" className="mt-0">
                  <pre className="rounded-lg bg-black/60 border border-purple-500/20 p-4 overflow-x-auto">
                    <code className="text-purple-100/90">{`const response = await fetch('https://api.thinkflowgpt.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    messages: [
      {role: 'system', content: 'You are a helpful assistant.'},
      {role: 'user', content: 'Hello, how are you?'}
    ]
  })
});

const data = await response.json();
console.log(data);`}</code>
                  </pre>
                </TabsContent>
                <TabsContent value="python" className="mt-0">
                  <pre className="rounded-lg bg-black/60 border border-purple-500/20 p-4 overflow-x-auto">
                    <code className="text-purple-100/90">{`import requests

response = requests.post(
    'https://api.thinkflowgpt.com/v1/chat/completions',
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
    },
    json={
        'messages': [
            {'role': 'system', 'content': 'You are a helpful assistant.'},
            {'role': 'user', 'content': 'Hello, how are you?'}
        ]
    }
)

data = response.json()
print(data)`}</code>
                  </pre>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

