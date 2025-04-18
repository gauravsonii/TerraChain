import { NextResponse } from "next/server"

export async function GET() {
  // Only return a masked version of the API key or a token that can be used
  // with limited scope/domain restrictions
  return NextResponse.json({
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
    // You can add additional configuration here if needed
  })
}
