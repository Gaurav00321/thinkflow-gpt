import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Code, Workflow, Zap } from "lucide-react"

const features = [
	{		icon: <div className="relative p-1">
			<div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-violet-400/40 to-fuchsia-400/40 blur-[2px]" />
			<MessageSquare className="relative h-10 w-10 stroke-2 text-white drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]" />
		</div>,
		title: "Chat Completions",
		description: "Generate contextually relevant responses with our advanced language model.",
	},
	{		icon: <div className="relative p-1">
			<div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-cyan-400/40 to-blue-400/40 blur-[2px]" />
			<Code className="relative h-10 w-10 stroke-2 text-white drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
		</div>,
		title: "Code Generation",
		description: "Generate optimized code in multiple languages with intelligent suggestions.",
	},
	{		icon: <div className="relative p-1">
			<div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-emerald-400/40 to-teal-400/40 blur-[2px]" />
			<Workflow className="relative h-10 w-10 stroke-2 text-white drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
		</div>,
		title: "Workflow Automation",
		description: "Create powerful AI-driven automation workflows with our flexible API.",
	},
	{		icon: <div className="relative p-1">
			<div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-amber-400/40 to-orange-400/40 blur-[2px]" />
			<Zap className="relative h-10 w-10 stroke-2 text-white drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
		</div>,
		title: "Real-time Processing",
		description: "Process requests in milliseconds with our high-performance infrastructure.",
	},
]

export function ApiOverview() {
	return (		<section className="container relative py-12 md:py-20">
			{/* Background decorations */}
			<div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent" />
			<div className="absolute inset-0">
				<div className="absolute top-1/4 -left-1/2 w-full aspect-square bg-purple-900/20 rounded-full blur-3xl animate-pulse opacity-30" />
			</div>

			<div className="relative mx-auto max-w-[58rem]">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}					className="mb-12 md:mb-16 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400"
				>
					API Features
				</motion.h2><div className="grid gap-8 sm:gap-6 md:grid-cols-2 md:gap-8">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
						>							<Card className="group relative overflow-hidden backdrop-blur-sm border-purple-500/20 bg-black/40 hover:bg-black/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10">
								<div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
								<CardHeader className="pb-4">
									<div className="flex flex-col items-center text-center gap-4 sm:flex-row sm:text-left">
										<div className="rounded-xl bg-gradient-to-br from-purple-600/10 to-fuchsia-600/10 p-3.5 ring-1 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all transform group-hover:scale-110 duration-300 hover:shadow-md">
											{feature.icon}
										</div>
										<CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-50 to-purple-200 bg-clip-text text-transparent group-hover:from-white group-hover:to-purple-100 transition-all duration-300">
											{feature.title}
										</CardTitle>
									</div>
								</CardHeader>								<CardContent>
									<CardDescription className="text-purple-100/70 group-hover:text-purple-100/90 text-base transition-colors text-center sm:text-left leading-relaxed">
										{feature.description}
									</CardDescription>
								</CardContent>
								<div className="absolute inset-0 ring-1 ring-inset ring-purple-500/20 group-hover:ring-purple-500/40 rounded-lg transition-colors" />
								<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent group-hover:via-purple-500/40 transition-colors" />
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}

