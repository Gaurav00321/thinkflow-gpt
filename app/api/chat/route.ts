import { NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import Together from "together-ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, systemPrompt } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Message history is required" },
        { status: 400 }
      );
    }

    // Check if Together AI API key is available
    if (process.env.TOGETHER_API_KEY) {
      // Use Together AI implementation
      return handleTogetherAI(messages, systemPrompt);
    } else if (process.env.OPENAI_API_KEY) {
      // Use OpenAI implementation with AI SDK
      return handleOpenAI(messages, systemPrompt);
    } else {
      return NextResponse.json(
        { error: "No API key configured for AI providers" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}

async function handleOpenAI(messages: any[], systemPrompt: string) {
  try {
    // Format messages for AI SDK
    const formattedMessages = messages.map(({ role, content }) => ({
      role,
      content,
    }));

    // Add system message if provided
    if (systemPrompt) {
      formattedMessages.unshift({
        role: "system",
        content: systemPrompt,
      });
    }

    const result = streamText({
      model: openai("gpt-4o"),
      messages: formattedMessages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in OpenAI implementation:", error);
    return NextResponse.json(
      { error: "Failed to communicate with OpenAI" },
      { status: 500 }
    );
  }
}

async function handleTogetherAI(messages: any[], systemPrompt: string) {
  try {
    const together = new Together({
      apiKey: process.env.TOGETHER_API_KEY,
    });

    // Format messages for Together AI
    const formattedMessages = messages.map(({ role, content }) => ({
      role,
      content,
    }));

    // Add system message if provided
    if (systemPrompt) {
      formattedMessages.unshift({
        role: "system",
        content: systemPrompt,
      });
    }

    // Create a streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await together.chat.completions.create({
            messages: formattedMessages,
            model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
            max_tokens: 512,
            temperature: 0.7,
            top_p: 0.7,
            top_k: 50,
            repetition_penalty: 1,
            stop: ["<|eot_id|>", "<|eom_id|>"],
            stream: false, // Together AI might not support streaming in the same way
          });

          // Extract the complete response
          const responseText = response.choices[0]?.message?.content || "";

          // Create a JSON object matching the format expected by the frontend
          const jsonResponse = JSON.stringify({ message: responseText });

          // Encode and send the response
          const encoder = new TextEncoder();
          controller.enqueue(encoder.encode(jsonResponse));
          controller.close();
        } catch (error) {
          console.error("Error in Together AI streaming:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in Together AI implementation:", error);
    return NextResponse.json(
      { error: "Failed to communicate with Together AI" },
      { status: 500 }
    );
  }
}
