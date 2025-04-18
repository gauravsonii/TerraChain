import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Validate request
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    // Get API key from environment variables
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    // Prepare context for land records domain
    const systemMessage = {
      role: "system",
      content: `You are TerraBot, an AI assistant specialized in Indian land records and property documentation. 
      You have knowledge about:
      - Land record types in India (RoR, Jamabandi, Khasra, Khatauni, etc.)
      - Land measurement units across different states
      - Basic property laws and regulations
      - Document verification processes
      - Land record digitization initiatives
      
      You can help users with queries about land documentation, verification processes, and using the TerraChain platform.
      You can communicate in both English and Hindi. Keep responses concise and helpful.
      
      Current date: ${new Date().toISOString().split("T")[0]}`,
    }

    // Call OpenRouter API with Llama model
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://terrachain.vercel.app",
        "X-Title": "TerraChain Land Records Assistant",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [systemMessage, ...messages],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("OpenRouter API error:", errorData)
      return NextResponse.json({ error: "Failed to get response from AI service" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json({
      content: data.choices[0]?.message?.content || "I couldn't generate a response.",
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
