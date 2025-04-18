import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  // Only allow requests from our own domain in production
  const referer = req.headers.get("referer")
  if (process.env.NODE_ENV === "production" && (!referer || !referer.includes(process.env.VERCEL_URL || ""))) {
    return new Response("Unauthorized", { status: 401 })
  }

  // Return the Mappls API key
  return NextResponse.json({
    apiKey: process.env.MAPPLS_API_KEY || "",
  })
}
