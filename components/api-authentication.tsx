import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ApiAuthentication() {
  return (
    <section className="container py-12">
      <div className="mx-auto max-w-[58rem]">
        <h2 className="mb-8 text-3xl font-bold">Authentication</h2>
        <Card>
          <CardHeader>
            <CardTitle>API Key Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">All API requests must include your API key in the Authorization header:</p>
            <Tabs defaultValue="curl">
              <TabsList className="mb-4">
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
              </TabsList>
              <TabsContent value="curl" className="mt-0">
                <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                  <code>{`curl -X POST https://api.thinkflowgpt.com/v1/chat/completions \\
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
                <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                  <code>{`const response = await fetch('https://api.thinkflowgpt.com/v1/chat/completions', {
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
                <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                  <code>{`import requests

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
      </div>
    </section>
  )
}

