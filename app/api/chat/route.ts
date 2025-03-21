import { NextResponse } from "next/server";
import Together from "together-ai";

export async function POST(req: Request) {
  try {
    const { messages, systemPrompt } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Message history is required" },
        { status: 400 }
      );
    }

    const latestMessage = messages[messages.length - 1]?.content?.trim();

    if (!latestMessage) {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    const together = new Together({
      apiKey: process.env.TOGETHER_API_KEY || "",
    });

    if (!process.env.TOGETHER_API_KEY) {
      return NextResponse.json(
        { error: "TOGETHER_API_KEY is missing" },
        { status: 500 }
      );
    }

    const response = await together.chat.completions.create({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      max_tokens: 512,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
      stop: ["<|eot_id|>", "<|eom_id|>"],
      stream: true,
    });

    let chatResponse = "";
    for await (const token of response) {
      chatResponse += token.choices[0]?.delta?.content || "";
    }

    return NextResponse.json({ message: chatResponse });
  } catch (error) {
    console.error("Error in Together AI API:", error);
    return NextResponse.json(
      { error: "Failed to communicate with Together AI" },
      { status: 500 }
    );
  }
}
