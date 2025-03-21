import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Code, Workflow, Zap } from "lucide-react"

const features = [
  {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: "Chat Completions",
    description: "Generate conversational responses for chatbots and virtual assistants.",
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Code Generation",
    description: "Generate code snippets, debug issues, and get programming assistance.",
  },
  {
    icon: <Workflow className="h-10 w-10 text-primary" />,
    title: "Workflow Automation",
    description: "Create custom AI-powered workflows for your business processes.",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Real-time Processing",
    description: "Process and analyze data in real-time with our high-performance API.",
  },
]

export function ApiOverview() {
  return (
    <section className="container py-12">
      <div className="mx-auto max-w-[58rem]">
        <h2 className="mb-8 text-3xl font-bold">API Features</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

