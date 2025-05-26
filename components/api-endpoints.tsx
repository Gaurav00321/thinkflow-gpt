import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Code, Copy } from "lucide-react"
import { useState } from "react"

const endpoints = [
	{
		name: "Chat Completions",
		endpoint: "/v1/chat/completions",
		method: "POST",
		description: "Generate a response based on a conversation.",
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
		description: "Generate code based on a description.",
		request: `{
  "language": "javascript",
  "prompt": "Write a function that calculates the factorial of a number",
  "comments": true
}`,
		response: `{
  "id": "code-12345",
  "object": "code.generation",
  "created": 1677858242,
  "language": "javascript",
  "code": "/**\n * Calculates the factorial of a number\n * @param {number} n - The input number\n * @returns {number} - The factorial of the input number\n */\nfunction factorial(n) {\n  if (n === 0 || n === 1) {\n    return 1;\n  }\n  return n * factorial(n - 1);\n}",
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 28,
    "total_tokens": 40
  }
}`,
	},
]

export function ApiEndpoints() {
	const [selectedTab, setSelectedTab] = useState("Chat Completions")
	const [copiedEndpoint, setCopiedEndpoint] = useState("")

	const copyToClipboard = (text: string, endpoint: string) => {
		navigator.clipboard.writeText(text)
		setCopiedEndpoint(endpoint)
		setTimeout(() => setCopiedEndpoint(""), 2000)
	}

	return (
		<section className="container py-12">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
				className="mx-auto max-w-[64rem]"
			>
				<div className="text-center mb-12">
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="mb-4 inline-flex items-center rounded-full bg-purple-900/30 px-4 py-1 text-sm text-purple-200 backdrop-blur-md border border-purple-500/20"
					>
						<Code className="mr-2 h-4 w-4 text-purple-400" />
						API Reference
					</motion.div>
					<h2 className="mb-4 text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400">
						Available Endpoints
					</h2>
					<p className="text-purple-100/80">
						Explore our comprehensive API endpoints and start building
					</p>
				</div>

				<Card className="border-purple-500/20 bg-black/40 backdrop-blur-sm">
					<CardContent className="p-6">
						<Tabs value={selectedTab} onValueChange={setSelectedTab}>
							<TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-transparent mb-6">
								{endpoints.map((endpoint) => (
									<TabsTrigger
										key={endpoint.name}
										value={endpoint.name}
										className="data-[state=active]:bg-purple-900/40 data-[state=active]:text-purple-100 data-[state=active]:border-purple-500/50 border border-purple-500/20 bg-black/20 text-purple-100/70 hover:bg-purple-900/20"
									>
										{endpoint.name}
									</TabsTrigger>
								))}
							</TabsList>

							{endpoints.map((endpoint) => (
								<TabsContent key={endpoint.name} value={endpoint.name}>
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<Badge
													className="bg-purple-600 hover:bg-purple-500 text-white"
													variant="secondary"
												>
													{endpoint.method}
												</Badge>
												<code className="rounded bg-purple-900/30 px-2 py-1 text-sm text-purple-200">
													{endpoint.endpoint}
												</code>
											</div>
											<motion.button
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												onClick={() =>
													copyToClipboard(endpoint.endpoint, endpoint.name)
												}
												className="inline-flex items-center gap-1 rounded-lg bg-purple-900/30 px-3 py-1 text-sm text-purple-200 hover:bg-purple-900/50 transition-colors"
											>
												{copiedEndpoint === endpoint.name ? (
													"Copied!"
												) : (
													<>
														<Copy className="h-4 w-4" /> Copy
													</>
												)}
											</motion.button>
										</div>

										<p className="text-purple-100/70">
											{endpoint.description}
										</p>

										<div className="grid gap-4 lg:grid-cols-2">
											<div>
												<h4 className="text-sm font-semibold text-purple-200 mb-2">
													Request
												</h4>
												<pre className="rounded-lg bg-black/60 p-4 text-sm text-purple-100/90 overflow-x-auto">
													{endpoint.request}
												</pre>
											</div>
											<div>
												<h4 className="text-sm font-semibold text-purple-200 mb-2">
													Response
												</h4>
												<pre className="rounded-lg bg-black/60 p-4 text-sm text-purple-100/90 overflow-x-auto">
													{endpoint.response}
												</pre>
											</div>
										</div>
									</div>
								</TabsContent>
							))}
						</Tabs>
					</CardContent>
				</Card>
			</motion.div>
		</section>
	)
}

