import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

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
  return (
    <section className="container py-12">
      <div className="mx-auto max-w-[58rem]">
        <h2 className="mb-8 text-3xl font-bold">API Endpoints</h2>
        <div className="space-y-8">
          {endpoints.map((endpoint, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{endpoint.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {endpoint.method}
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground">{endpoint.description}</p>
                <p className="font-mono text-sm text-muted-foreground">{endpoint.endpoint}</p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="request">
                  <TabsList className="mb-4">
                    <TabsTrigger value="request">Request</TabsTrigger>
                    <TabsTrigger value="response">Response</TabsTrigger>
                  </TabsList>
                  <TabsContent value="request" className="mt-0">
                    <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                      <code>{endpoint.request}</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="response" className="mt-0">
                    <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                      <code>{endpoint.response}</code>
                    </pre>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

