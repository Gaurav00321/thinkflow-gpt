import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Network } from "lucide-react"

const endpoints = [
	{
		name: "Chat Completions",
		endpoint: "/v1/chat/completions",
		method: "POST",
		description:
			"Generate natural and contextually relevant responses in a conversational format.",
		request: `{
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello, how are you?"}
  ],
  "max_tokens": 150,
  "temperature": 0.7
}`,
		response: `{
  "id": "chat-12345",
  "object": "chat.completion",
  "created": 1677858242,
  "model": "thinkflow-gpt-4",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "I'm doing well, thank you for asking! How can I assist you today?"
      },
      "finish_reason": "stop",
      "index": 0
    }
  ],
  "usage": {
    "prompt_tokens": 18,
    "completion_tokens": 16,
    "total_tokens": 34
  }
}`,
	},
	{
		name: "Code Generation",
		endpoint: "/v1/code/generate",
		method: "POST",
		description:
			"Generate high-quality code snippets with intelligent documentation and explanations.",
		request: `{
  "language": "javascript",
  "prompt": "Write a function that calculates the factorial of a number",
  "comments": true
}`,		response: `{
  "id": "code-12345",
  "object": "code.generation",
  "created": 1677858242,
  "language": "javascript",
  "code": "/**\\n * Calculates the factorial of a number\\n * @param {number} n - The input number\\n * @returns {number} - The factorial of the input number\\n */\\nfunction factorial(n) {\\n  if (n === 0 || n === 1) {\\n    return 1;\\n  }\\n  return n * factorial(n - 1);\\n}",
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 28,
    "total_tokens": 40
  }
}`
	}
]

export function ApiEndpoints() {
	return (
		<section className="container relative py-12">
			{/* Background decorations */}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
			<div className="absolute inset-0">
				<div className="absolute top-1/3 -left-1/2 w-full aspect-square bg-purple-900/20 rounded-full blur-3xl animate-pulse opacity-30" />
				<div className="absolute bottom-1/3 -right-1/2 w-full aspect-square bg-purple-800/20 rounded-full blur-3xl animate-pulse delay-500 opacity-30" />
			</div>

			<div className="relative mx-auto max-w-[58rem]">
				<div className="flex items-center gap-3 mb-8">
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						className="rounded-xl bg-purple-600/10 p-2 ring-1 ring-purple-500/20"
					>
						<Network className="h-8 w-8 text-purple-400" />
					</motion.div>
					<motion.h2
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400"
					>
						API Endpoints
					</motion.h2>
				</div>

				<div className="space-y-8">
					{endpoints.map((endpoint, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
						>
							<Card className="border-purple-500/20 bg-black/40 backdrop-blur-sm overflow-hidden group hover:bg-black/50 transition-colors">
								<div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
								<CardHeader>
									<div className="flex items-center justify-between">
										<CardTitle className="text-xl text-purple-50 group-hover:text-white transition-colors">
											{endpoint.name}
										</CardTitle>
										<Badge
											variant="outline"
											className="bg-purple-600/10 text-purple-200 border-purple-500/30 group-hover:border-purple-500/50"
										>
											{endpoint.method}
										</Badge>
									</div>
									<p className="text-purple-100/70 mt-2 group-hover:text-purple-100/90 transition-colors">
										{endpoint.description}
									</p>
									<p className="font-mono text-sm text-purple-400/60 mt-2 group-hover:text-purple-400/80">
										{endpoint.endpoint}
									</p>
								</CardHeader>
								<CardContent>
									<Tabs defaultValue="request" className="relative">
										<TabsList className="w-full justify-start mb-4 bg-purple-950/20 border border-purple-500/20">
											<TabsTrigger
												value="request"
												className="data-[state=active]:bg-purple-600/20"
											>
												Request
											</TabsTrigger>
											<TabsTrigger
												value="response"
												className="data-[state=active]:bg-purple-600/20"
											>
												Response
											</TabsTrigger>
										</TabsList>
										<TabsContent value="request" className="mt-0 group-hover:scale-[1.002] transition-transform">
											<pre className="rounded-lg bg-black/60 border border-purple-500/20 p-4 overflow-x-auto group-hover:border-purple-500/30 transition-colors">
												<code className="text-purple-100/90 group-hover:text-purple-100">
													{endpoint.request}
												</code>
											</pre>
										</TabsContent>
										<TabsContent value="response" className="mt-0 group-hover:scale-[1.002] transition-transform">
											<pre className="rounded-lg bg-black/60 border border-purple-500/20 p-4 overflow-x-auto group-hover:border-purple-500/30 transition-colors">
												<code className="text-purple-100/90 group-hover:text-purple-100">
													{endpoint.response}
												</code>
											</pre>
										</TabsContent>
									</Tabs>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}

