import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Code, Workflow, Zap } from "lucide-react"
import { motion } from "framer-motion"

const features = [
	{
		icon: <MessageSquare className="h-10 w-10 text-purple-400" />,
		title: "Chat Completions",
		description: "Generate conversational responses for chatbots and virtual assistants.",
		gradient: "from-purple-500/20 via-purple-400/10 to-purple-500/20",
	},
	{
		icon: <Code className="h-10 w-10 text-blue-400" />,
		title: "Code Generation",
		description: "Generate code snippets, debug issues, and get programming assistance.",
		gradient: "from-blue-500/20 via-blue-400/10 to-blue-500/20",
	},
	{
		icon: <Workflow className="h-10 w-10 text-green-400" />,
		title: "Workflow Automation",
		description: "Create custom AI-powered workflows for your business processes.",
		gradient: "from-green-500/20 via-green-400/10 to-green-500/20",
	},
	{
		icon: <Zap className="h-10 w-10 text-yellow-400" />,
		title: "Real-time Processing",
		description: "Process and analyze data in real-time with our high-performance API.",
		gradient: "from-yellow-500/20 via-yellow-400/10 to-yellow-500/20",
	},
]

export function ApiOverview() {
	return (
		<section className="container py-12">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
				className="mx-auto max-w-[58rem]"
			>
				<div className="text-center mb-12">
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="mb-4 inline-flex items-center rounded-full bg-purple-900/30 px-4 py-1 text-sm text-purple-200 backdrop-blur-md border border-purple-500/20"
					>
						<Zap className="mr-2 h-4 w-4 text-purple-400" />
						Powerful API Features
					</motion.div>
					<h2 className="mb-4 text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400">
						Everything You Need
					</h2>
					<p className="text-purple-100/80">
						Build intelligent applications with our comprehensive suite of API endpoints
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
						>
							<Card className="relative overflow-hidden border-purple-500/20 bg-black/40 backdrop-blur-sm transition-all duration-500 hover:bg-purple-950/20">
								<div className="absolute inset-0 bg-gradient-to-br opacity-20 {feature.gradient}" />
								<CardHeader>
									<div className="flex items-center gap-4">
										<motion.div
											whileHover={{ scale: 1.1, rotate: 5 }}
											className="rounded-xl bg-purple-900/30 p-2.5 border border-purple-500/20"
										>
											{feature.icon}
										</motion.div>
										<CardTitle className="text-purple-100">
											{feature.title}
										</CardTitle>
									</div>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-purple-100/70">
										{feature.description}
									</CardDescription>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	)
}

