import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    // Get the request body
    const body = await req.json()
    const { messages, systemPrompt } = body

    // Validate the request
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages are required and must be an array" }, { status: 400 })
    }

    // Check for API key in environment variables
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error("API key not configured")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    // Extract the last user message for the prompt
    const lastUserMessage = messages[messages.length - 1].content

    // Prepare conversation history for context
    const conversationHistory = messages
      .slice(0, -1)
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n")

    // Generate response using AI SDK
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: lastUserMessage,
      system: systemPrompt
        ? `${systemPrompt}\n\nConversation history:\n${conversationHistory}`
        : `You are a helpful assistant.\n\nConversation history:\n${conversationHistory}`,
    })

    // Return the response
    return NextResponse.json({
      message: text,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Error in chat API:", error)

    // Return a more detailed error message
    return NextResponse.json(
      {
        error: error.message || "An error occurred",
        details: error.stack || "No stack trace available",
      },
      { status: 500 },
    )
  }
}

