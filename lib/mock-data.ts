import { generateMockId, getRandomInt } from "@/lib/utils"

export const districts = [
  "North District",
  "South District",
  "East District",
  "West District",
  "Central District",
  "Bhopal",
  "Indore",
  "Jabalpur",
  "Gwalior",
  "Ujjain",
]

export const landStatuses = ["verified", "pending", "disputed"]

export const cropTypes = [
  "Wheat",
  "Rice",
  "Corn",
  "Soybeans",
  "Cotton",
  "Sugarcane",
  "Barley",
  "Pulses",
  "Vegetables",
  "Fruits",
]

export const mockLandRecords = Array.from({ length: 50 }).map((_, index) => {
  const status = landStatuses[getRandomInt(0, 2)]
  const district = districts[getRandomInt(0, districts.length - 1)]
  const crop = cropTypes[getRandomInt(0, cropTypes.length - 1)]
  const area = (getRandomInt(1, 20) + Math.random()).toFixed(2)
  const date = new Date()
  date.setDate(date.getDate() - getRandomInt(0, 365))

  return {
    id: generateMockId(),
    owner: `Owner ${index + 1}`,
    area: `${area} acres`,
    location: `${district}, Plot ${getRandomInt(1, 999)}`,
    status,
    lastUpdated: date.toISOString(),
    crop,
    documentHash: `Qm${Array.from(
      { length: 44 },
      () => "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 62)],
    ).join("")}`,
    transactionHash: `0x${Array.from({ length: 64 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join(
      "",
    )}`,
    acquisitionDate: new Date(Date.now() - getRandomInt(365 * 2, 365 * 10) * 24 * 60 * 60 * 1000).toISOString(),
    additionalNotes: `This is a sample land record with ${area} acres in ${district}.`,
    anomalyScore: getRandomInt(0, 100),
    verificationCount: getRandomInt(0, 50),
    ownerHistory: [
      {
        name: `Previous Owner ${index}`,
        period: `${2010 - getRandomInt(1, 10)} - ${2020 - getRandomInt(1, 5)}`,
      },
      {
        name: `Original Owner ${index}`,
        period: `${1990 - getRandomInt(1, 10)} - ${2010 - getRandomInt(1, 10)}`,
      },
    ],
  }
})

export const mockUserActivity = [
  {
    id: 1,
    action: "Uploaded new land record",
    recordId: mockLandRecords[0].id,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    action: "Verified land record",
    recordId: mockLandRecords[1].id,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    action: "Updated land record",
    recordId: mockLandRecords[2].id,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    action: "Queried land record",
    recordId: mockLandRecords[3].id,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    action: "Analyzed land document",
    recordId: mockLandRecords[4].id,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const mockUserStats = {
  uploads: 12,
  queries: 45,
  verifiedDocs: 8,
  disputes: 2,
  totalLandArea: 78.5,
}

export const mockAnomalyTypes = [
  "Signature mismatch",
  "Date inconsistency",
  "Ownership conflict",
  "Boundary dispute",
  "Document tampering",
  "Missing official seal",
  "Incorrect survey number",
  "Invalid registration",
]

export const mockCaseLaw = [
  {
    id: 1,
    title: "Singh vs. State of Madhya Pradesh",
    citation: "(2019) 5 SCC 123",
    summary: "Landmark case regarding ancestral land rights and government acquisition.",
    relevance: "High",
  },
  {
    id: 2,
    title: "Patel vs. Municipal Corporation",
    citation: "(2018) 3 SCC 456",
    summary: "Case involving urban land zoning and development rights.",
    relevance: "Medium",
  },
  {
    id: 3,
    title: "Kumar vs. Revenue Department",
    citation: "(2020) 7 SCC 789",
    summary: "Dispute over land record maintenance and administrative errors.",
    relevance: "High",
  },
  {
    id: 4,
    title: "Sharma vs. Sharma",
    citation: "(2017) 2 SCC 321",
    summary: "Family dispute over inherited agricultural land.",
    relevance: "Medium",
  },
  {
    id: 5,
    title: "Reddy vs. Forest Department",
    citation: "(2021) 1 SCC 654",
    summary: "Case regarding forest land encroachment and tribal rights.",
    relevance: "High",
  },
]

export const mockTerrabotResponses = {
  greeting: "नमस्ते! I'm TerraBot, your AI assistant for land records. How can I help you today?",
  landLawQuery:
    "According to the Indian Registration Act of 1908, all land transactions must be registered with the Sub-Registrar of Assurances. The Land Acquisition Act of 2013 governs the process of land acquisition by the government.",
  documentRequirements:
    "For land registration in India, you typically need: 1) Sale Deed, 2) Property Tax receipts, 3) Encumbrance Certificate, 4) Land Use Certificate, and 5) NOC from relevant authorities if applicable.",
  disputeResolution:
    "Land disputes in India can be resolved through: 1) Civil courts, 2) Revenue courts, 3) Gram Nyayalayas, or 4) Alternative Dispute Resolution mechanisms like arbitration.",
  recordVerification:
    "To verify a land record, you can: 1) Check with the local Tehsildar office, 2) Verify online through the state's land records portal, 3) Obtain an Encumbrance Certificate, or 4) Consult a property lawyer.",
}

export const mockTools = [
  {
    id: "document-validator",
    name: "Document Validator",
    description: "Scan formats for state-specific validity",
    icon: "FileCheck",
    available: true,
  },
  {
    id: "land-locator",
    name: "Land Locator",
    description: "Input a survey number to auto-map the location",
    icon: "MapPin",
    available: true,
  },
  {
    id: "case-law-finder",
    name: "Case Law Finder",
    description: "Search major Indian land dispute cases",
    icon: "Scale",
    available: true,
  },
  {
    id: "developer-playground",
    name: "Developer Playground",
    description: "TerraChain API sandbox for frontend integrations",
    icon: "Code",
    available: true,
  },
  {
    id: "kyc-sandbox",
    name: "KYC Sandbox",
    description: "Simulate Aadhaar + Face verification flow",
    icon: "Scan",
    available: false,
  },
]

export const mockComingSoonFeatures = [
  {
    id: "ai-price-predictor",
    name: "AI Price Predictor",
    description: "Predict land values using machine learning",
    icon: "TrendingUp",
    eta: "Q1 2024",
  },
  {
    id: "voice-to-text",
    name: "Voice-to-Text Uploader",
    description: "Speech-enabled document metadata extraction",
    icon: "Mic",
    eta: "Q2 2024",
  },
  {
    id: "ulpin-search",
    name: "ULPIN Deep Search",
    description: "Auto-fetch official land data via government APIs",
    icon: "Search",
    eta: "Q2 2024",
  },
  {
    id: "aadhaar-kyc",
    name: "Aadhaar-Linked e-KYC",
    description: "Secure identity verification for ownership claims",
    icon: "Fingerprint",
    eta: "Q3 2024",
  },
  {
    id: "dispute-detection",
    name: "Smart Land Dispute Detection",
    description: "AI-driven fraud/inconsistency alerts",
    icon: "AlertTriangle",
    eta: "Q3 2024",
  },
  {
    id: "community-verification",
    name: "Community Verification Voting",
    description: "Users vote/upvote trusted records",
    icon: "Vote",
    eta: "Q4 2024",
  },
  {
    id: "gis-mapping",
    name: "Interactive GIS Mapping",
    description: "Overlay land data on maps",
    icon: "Map",
    eta: "Q4 2024",
  },
]
