import { Code2, MessageSquare, LayoutDashboard, Lock, Zap, Workflow } from "lucide-react"

const features = [
  {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: "AI-Powered Chat",
    description: "Engage with our advanced AI model for personalized assistance and interactive conversations.",
  },
  {
    icon: <Code2 className="h-10 w-10 text-primary" />,
    title: "Code Assistance",
    description: "Get real-time coding help, debugging suggestions, and auto-complete functionality.",
  },
  {
    icon: <Workflow className="h-10 w-10 text-primary" />,
    title: "Workflow Automation",
    description: "Create custom AI-powered automations with our intuitive drag-and-drop builder.",
  },
  {
    icon: <LayoutDashboard className="h-10 w-10 text-primary" />,
    title: "Business Dashboard",
    description: "Access AI-generated reports, analytics, and insights to optimize your business processes.",
  },
  {
    icon: <Lock className="h-10 w-10 text-primary" />,
    title: "Secure Authentication",
    description: "Multi-tenant login options with Google, GitHub, and business domain integration.",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Real-time Execution",
    description: "Write, analyze, and execute code directly in the chat window with our powerful execution engine.",
  },
]

export function Features() {
  return (
    <section className="container py-20 space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful Features</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
          Discover how ThinkFlowGPT can transform your workflow with these cutting-edge features.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-4 rounded-lg border p-6 text-center shadow-sm transition-all hover:shadow-md"
          >
            <div className="rounded-full bg-primary/10 p-4">{feature.icon}</div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

