import { mockLandRecords, mockUserActivity, mockUserStats, mockCaseLaw } from "@/lib/mock-data"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const api = {
  // Land Records
  getLandRecords: async (filters?: any) => {
    await delay(800)
    let records = [...mockLandRecords]

    if (filters) {
      if (filters.status) {
        records = records.filter((record) => record.status === filters.status)
      }
      if (filters.district) {
        records = records.filter((record) => record.location.includes(filters.district))
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        records = records.filter(
          (record) =>
            record.owner.toLowerCase().includes(searchLower) ||
            record.id.toLowerCase().includes(searchLower) ||
            record.location.toLowerCase().includes(searchLower),
        )
      }
    }

    return { success: true, records }
  },

  getLandRecordById: async (id: string) => {
    await delay(600)
    const record = mockLandRecords.find((record) => record.id === id)

    if (!record) {
      return { success: false, error: "Record not found" }
    }

    return { success: true, record }
  },

  createLandRecord: async (data: any) => {
    await delay(1200)
    return {
      success: true,
      recordId: `TC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      transactionHash: `0x${Array.from({ length: 64 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("")}`,
    }
  },

  // User Activity
  getUserActivity: async () => {
    await delay(500)
    return { success: true, activities: mockUserActivity }
  },

  getUserStats: async () => {
    await delay(400)
    return { success: true, stats: mockUserStats }
  },

  // Document Analysis
  analyzeDocument: async (file: File) => {
    await delay(2000)
    const anomalyScore = Math.floor(Math.random() * 100)
    const anomalies = []

    if (anomalyScore > 70) {
      anomalies.push("Signature mismatch detected")
      anomalies.push("Inconsistent dates found")
    } else if (anomalyScore > 40) {
      anomalies.push("Minor inconsistencies in property description")
    }

    return {
      success: true,
      fileName: file.name,
      fileSize: file.size,
      anomalyScore,
      anomalies,
      recommendation:
        anomalyScore > 70
          ? "High risk - verification needed"
          : anomalyScore > 40
            ? "Medium risk - review recommended"
            : "Low risk - appears valid",
    }
  },

  // Case Law
  searchCaseLaw: async (query: string) => {
    await delay(700)
    let results = [...mockCaseLaw]

    if (query) {
      const queryLower = query.toLowerCase()
      results = results.filter(
        (case_) => case_.title.toLowerCase().includes(queryLower) || case_.summary.toLowerCase().includes(queryLower),
      )
    }

    return { success: true, results }
  },

  // TerraBot
  askTerraBot: async (question: string) => {
    await delay(1500)

    // Simple keyword matching for demo purposes
    let response = "I'm not sure about that. Could you please rephrase your question?"

    if (question.toLowerCase().includes("land law") || question.toLowerCase().includes("act")) {
      response =
        "According to the Indian Registration Act of 1908, all land transactions must be registered with the Sub-Registrar of Assurances. The Land Acquisition Act of 2013 governs the process of land acquisition by the government."
    } else if (question.toLowerCase().includes("document") || question.toLowerCase().includes("require")) {
      response =
        "For land registration in India, you typically need: 1) Sale Deed, 2) Property Tax receipts, 3) Encumbrance Certificate, 4) Land Use Certificate, and 5) NOC from relevant authorities if applicable."
    } else if (question.toLowerCase().includes("dispute") || question.toLowerCase().includes("resolution")) {
      response =
        "Land disputes in India can be resolved through: 1) Civil courts, 2) Revenue courts, 3) Gram Nyayalayas, or 4) Alternative Dispute Resolution mechanisms like arbitration."
    } else if (question.toLowerCase().includes("verify") || question.toLowerCase().includes("check")) {
      response =
        "To verify a land record, you can: 1) Check with the local Tehsildar office, 2) Verify online through the state's land records portal, 3) Obtain an Encumbrance Certificate, or 4) Consult a property lawyer."
    }

    return {
      success: true,
      response,
      sources: [
        { title: "Indian Registration Act, 1908", url: "#" },
        { title: "Land Acquisition Act, 2013", url: "#" },
        { title: "TerraChain Knowledge Base", url: "#" },
      ],
    }
  },
}
