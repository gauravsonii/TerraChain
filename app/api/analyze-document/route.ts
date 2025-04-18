import { type NextRequest, NextResponse } from "next/server"
import { mockAnalyzeLandDocument } from "@/lib/document-ai"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 })
    }

    // In production, use the real document analysis service
    // const result = await analyzeLandDocument(file);

    // For demo purposes, use the mock implementation
    const result = await mockAnalyzeLandDocument(file)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in document analysis API:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
