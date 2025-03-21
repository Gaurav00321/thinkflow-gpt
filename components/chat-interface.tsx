"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { Loader2, Send, User, Bot, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useChatStore } from "@/hooks/use-chat-store"
import { CodeBlock } from "@/components/code-block"
import { v4 as uuidv4 } from "uuid"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  mode: "chat" | "code"
}

export function ChatInterface({ mode }: ChatInterfaceProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { addChat } = useChatStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const systemPrompt =
        mode === "code"
          ? "You are an expert coding assistant. Provide code examples, explanations, and debugging help. Always format code blocks properly with the appropriate language tags."
          : "You are ThinkFlowGPT, an AI assistant for businesses and students. Provide helpful, concise responses."

      // Use the secure API route with improved error handling
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          systemPrompt,
        }),
      })

      const data = await response.json()

      // Check if the response contains an error
      if (!response.ok || data.error) {
        console.error("API error:", data.error, data.details)
        throw new Error(data.error || "Failed to get response from AI")
      }

      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (user) {
        addChat({
          id: uuidv4(),
          title: input.slice(0, 30) + (input.length > 30 ? "..." : ""),
          messages: [...messages, userMessage, assistantMessage],
          createdAt: new Date(),
        })
      }
    } catch (error) {
      console.error("Error generating response:", error)

      // Add the error message to the chat as a system message
      const errorMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: "I'm sorry, I encountered an error while processing your request. Please try again later.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])

      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate a response. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const formatMessage = (content: string) => {
    // Simple regex to identify code blocks
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(
          <div key={`text-${match.index}`} className="whitespace-pre-wrap">
            {content.slice(lastIndex, match.index)}
          </div>,
        )
      }

      // Add code block
      const language = match[1] || "plaintext"
      const code = match[2]
      parts.push(<CodeBlock key={`code-${match.index}`} language={language} code={code} />)

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(
        <div key={`text-end`} className="whitespace-pre-wrap">
          {content.slice(lastIndex)}
        </div>,
      )
    }

    return parts.length > 0 ? parts : <div className="whitespace-pre-wrap">{content}</div>
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Bot className="h-16 w-16 text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              Welcome to ThinkFlowGPT {mode === "code" ? "Code Assistant" : "Chat"}
            </h2>
            <p className="text-muted-foreground max-w-md">
              {mode === "code"
                ? "Ask me about coding problems, get help with debugging, or request code examples."
                : "Ask me anything! I'm here to help with your questions and tasks."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex gap-3 max-w-[90%]", message.role === "user" ? "ml-auto" : "mr-auto")}
              >
                <Avatar className={message.role === "user" ? "order-2" : ""}>
                  {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                </Avatar>
                <Card
                  className={cn(
                    "p-4 relative group",
                    message.role === "user" ? "bg-primary text-primary-foreground" : "",
                  )}
                >
                  {formatMessage(message.content)}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleCopy(message.id, message.content)}
                  >
                    {copiedId === message.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </Card>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            placeholder={`Type your ${mode === "code" ? "code question" : "message"}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </form>
      </div>
    </div>
  )
}

