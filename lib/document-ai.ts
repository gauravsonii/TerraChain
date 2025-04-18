// Document AI service for analyzing land records
export async function analyzeLandDocument(file: File): Promise<{
  success: boolean
  data?: any
  error?: string
}> {
  try {
    // Create form data
    const formData = new FormData()
    formData.append("file", file)

    // Call Document AI API
    const response = await fetch("/api/analyze-document", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error("Error analyzing document:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// Mock implementation for demo purposes
export async function mockAnalyzeLandDocument(file: File): Promise<{
  success: boolean
  data?: any
  error?: string
}> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Mock response
  return {
    success: true,
    data: {
      documentType: "Land Deed",
      confidence: 0.92,
      entities: [
        { type: "OWNER_NAME", text: "Rajesh Kumar", confidence: 0.95 },
        { type: "PROPERTY_ADDRESS", text: "123 Main St, Bhopal, MP", confidence: 0.89 },
        { type: "SURVEY_NUMBER", text: "456/A", confidence: 0.93 },
        { type: "AREA", text: "5.2 acres", confidence: 0.91 },
        { type: "REGISTRATION_DATE", text: "15/03/2024", confidence: 0.97 },
      ],
      anomalies: [],
      recommendations: [
        "Document appears to be valid",
        "All required fields are present",
        "No inconsistencies detected",
      ],
    },
  }
}
