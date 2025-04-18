// AI Service for TerraBot
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateBotResponse(prompt: string): Promise<string> {
  try {
    const systemPrompt = `You are TerraBot, an AI assistant for TerraChain - a blockchain-based land record management system in India.
    You help users with questions about land records, ULPIN (Unique Land Parcel Identification Number), document verification, 
    and using the TerraChain platform. Be concise, helpful, and knowledgeable about Indian land laws and regulations.
    Current date: April 2025.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 500,
    })

    return text
  } catch (error) {
    console.error("Error generating bot response:", error)
    return "I'm sorry, I encountered an error. Please try again later."
  }
}

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  try {
    const formData = new FormData()
    formData.append("file", audioBlob)
    formData.append("model", "whisper-1")

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: formData,
    })

    const data = await response.json()
    return data.text
  } catch (error) {
    console.error("Error transcribing audio:", error)
    return ""
  }
}
