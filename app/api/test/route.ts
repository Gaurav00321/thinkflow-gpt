import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if the OpenAI API key is set
    const apiKeyExists = !!process.env.OPENAI_API_KEY

    // Don't return the actual key, just whether it exists
    return NextResponse.json({
      status: "success",
      apiKeyConfigured: apiKeyExists,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Error in test API:", error)
    return NextResponse.json({ error: error.message || "An error occurred" }, { status: 500 })
  }
}

