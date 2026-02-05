import { NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText, generateText } from "ai";
import Together from "together-ai";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, systemPrompt, chatId, skipUserPersistence } = await req.json();
    const cookieStore = await cookies();
    const supabase = await createClient();

    // 1. Get User
    const { data: { user } } = await supabase.auth.getUser();

    // 2. Limit Check Logic
    let isAllowed = false;
    let limitRemaining = 0;
    let userId = user?.id;

    if (user) {
      // Authenticated User
      // Call RPC to check and increment
      const { data: usageData, error: rpcError } = await supabase
        .rpc('check_and_increment_usage', { user_id_param: user.id });

      if (rpcError) {
        console.error("RPC Error:", rpcError);
        // Fail open or closed? Closed for security.
        return NextResponse.json({ error: "Failed to verify limits" }, { status: 500 });
      }

      // usageData is like { allowed: true, remaining: 199 }
      // need to cast it or access safely
      const result = usageData as any;

      if (!result.allowed) {
        if (result.reason === 'limit_reached') {
          return NextResponse.json(
            { error: "Daily limit reached. Upgrade to Pro.", code: "LIMIT_REACHED" },
            { status: 403 }
          );
        }
      }

      isAllowed = true;
      limitRemaining = result.remaining;

    } else {
      // Anonymous User
      const anonCount = parseInt(cookieStore.get('thinkflow-anon-count')?.value || '0');

      if (anonCount >= 2) {
        return NextResponse.json(
          { error: "Free anon limit reached. Please sign in.", code: "ANON_LIMIT_REACHED" },
          { status: 403 }
        );
      }

      isAllowed = true;
      limitRemaining = 2 - (anonCount + 1);

      // Increment Cookie
      // Note: We can't set cookies in NextResponse easily when streaming with AI SDK or custom streams
      // unless we wrap the response headers. 
      // We'll pass this requirement to the response creation below.
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Message history is required" },
        { status: 400 }
      );
    }

    // 3. Database Operations (Sync User & Chat) - Only for Auth Users
    let currentChatId = chatId;

    if (user) {
      // Sync User Profile (Idempotent)
      // Usually trigger handles creation, but updates to avatar/email might be needed.
      // We rely on the trigger for now to keep it fast.

      // Handle Chat Session
      if (!currentChatId) {
        const { data: newChat, error: chatError } = await supabase
          .from('chats')
          .insert({
            user_id: user.id,
            title: messages[messages.length - 1].content.slice(0, 30) || "New Chat",
          })
          .select()
          .single();

        if (chatError) {
          console.error("Error creating chat:", chatError);
          return NextResponse.json({ error: "Failed to create chat session" }, { status: 500 });
        }

        if (newChat) {
          currentChatId = newChat.id;
        }
      }

      // Store User Message
      // Store User Message
      if (currentChatId && !skipUserPersistence) {
        const { error: msgError } = await supabase.from('messages').insert({
          chat_id: currentChatId,
          role: 'user',
          content: messages[messages.length - 1].content
        });

        if (msgError) {
          console.error("Error storing user message:", msgError);
          // Verify if user has access to this chat?
          // If RLS fails, we might get an error here.
          return NextResponse.json({ error: "Failed to send message. You may not have permission to edit this chat." }, { status: 403 });
        }
      }
    }

    // 4. AI Generation
    let aiResponseStream: Response;

    if (process.env.TOGETHER_API_KEY) {
      aiResponseStream = await handleTogetherAI(messages, systemPrompt);
    } else if (process.env.OPENAI_API_KEY) {
      aiResponseStream = await handleOpenAI(messages, systemPrompt, currentChatId, supabase); // Pass supabase client if we want OpenAI to save onFinish
    } else {
      return NextResponse.json(
        { error: "No API key configured" },
        { status: 500 }
      );
    }

    // 5. Handle Response & Persistence
    // For TogetherAI (current impl is full text fetch, not stream):
    const originalBody = await aiResponseStream.text();
    let aiContent = "";

    try {
      const parsed = JSON.parse(originalBody);
      aiContent = parsed.message;
    } catch (e) {
      // OpenAI stream handling would be different
    }

    // Save Assistant Message (Auth Users Only)
    if (user && currentChatId && aiContent) {
      await supabase.from('messages').insert({
        chat_id: currentChatId,
        role: 'assistant',
        content: aiContent
      });
    }

    // Construct Response
    const response = new Response(originalBody, {
      headers: {
        "Content-Type": "application/json",
        "X-Chat-Id": currentChatId || "",
        "X-Remaining": limitRemaining.toString()
      }
    });

    // Set Anon Cookie if needed
    if (!user) {
      const newCount = parseInt(cookieStore.get('thinkflow-anon-count')?.value || '0') + 1;
      // We need to set this on the response object
      // But we can't easily set cookies on this Response object if it's not a NextResponse?
      // Actually Response object supports headers 'Set-Cookie'.
      // But creating a Set-Cookie string manually is annoying.
      // Use cookieStore? cookieStore.set() works in Server Actions/Middleware, but inside Route Handler 
      // it might only work relative to the request context or require setting on response.
      // In Next.js 15, cookieStore.set() in a Route Handler sets the Set-Cookie header on the outgoing response automatically? 
      // Let's verify: "cookies() ... Read-only in Route Handlers" -> "You can't set cookies using cookies().set() in a Route Handler". 
      // So we MUST set the header manually.

      const oneDay = 24 * 60 * 60;
      response.headers.append('Set-Cookie', `thinkflow-anon-count=${newCount}; Path=/; Max-Age=${oneDay}; SameSite=Lax`);
    }

    return response;

  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}

async function handleOpenAI(messages: any[], systemPrompt: string, chatId?: string, supabase?: any) {
  // ... (OpenAI implementation similar to before, but we can't easily use onFinish with the Response intercept pattern above unless we stream)
  // For simplicity, let's keep the existing structure where we just return the stream/response 
  // AND for OpenAI we sacrifice DB storage in this refactor unless we refactor to full streaming + callbacks.
  // GIVEN THE REQUIREMENT: "Supabase Integration (Mandatory)... Use Supabase for ... Chat message counts"
  // PROPOSAL: Use `streamText` and its `onFinish` to save to DB. 
  // But then we return a stream, and we can't easily append headers to it after it starts?
  // Actually `toTextStreamResponse` allows headers.

  // Let's stick to the non-streaming TogetherAI approach for now as it's the primary one used effectively in the previous code.
  // Or implement OpenAI fully.

  // Minimal OpenAI Shim:
  try {
    const formattedMessages = messages.map(({ role, content }) => ({ role, content }));
    if (systemPrompt) formattedMessages.unshift({ role: "system", content: systemPrompt });

    const { text } = await generateText({
      model: openai("gpt-4o"),
      messages: formattedMessages,
    });

    // Mimic TogetherAI JSON structure
    return new Response(JSON.stringify({ message: text }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    throw error;
  }
}

async function handleTogetherAI(messages: any[], systemPrompt: string) {
  try {
    const together = new Together({
      apiKey: process.env.TOGETHER_API_KEY,
    });

    const formattedMessages = messages.map(({ role, content }) => ({
      role,
      content,
    }));

    if (systemPrompt) {
      formattedMessages.unshift({
        role: "system",
        content: systemPrompt,
      });
    }

    const response = await together.chat.completions.create({
      messages: formattedMessages,
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      max_tokens: 512,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
      stop: ["<|eot_id|>", "<|eom_id|>"],
      stream: false,
    });

    const responseText = response.choices[0]?.message?.content || "";
    const jsonResponse = JSON.stringify({ message: responseText });

    return new Response(jsonResponse, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in Together AI implementation:", error);
    return new Response(JSON.stringify({ message: "Error generating response" }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
