"use client"

export interface LandRecord {
  id: number
  owner: string
  location: string
  landArea: number
  cropHistory: string
  documentHash: string
  timestamp: string
}

export async function createLandRecord(
  location: string,
  landArea: number,
  cropHistory: string,
  documentHash: string,
): Promise<{ success: boolean; transactionHash?: string; recordId?: number; error?: string }> {
  // Mock implementation - replace with actual blockchain interaction
  return new Promise((resolve) => {
    setTimeout(() => {
      const success = Math.random() > 0.1 // Simulate occasional failures
      if (success) {
        resolve({
          success: true,
          transactionHash: "0x" + Math.random().toString(36).substring(2, 15),
          recordId: Math.floor(Math.random() * 1000),
        })
      } else {
        resolve({ success: false, error: "Failed to create land record on blockchain" })
      }
    }, 1500) // Simulate network latency
  })
}

export async function getAllLandRecords(): Promise<{ success: boolean; records?: LandRecord[]; error?: string }> {
  // Mock implementation - replace with actual blockchain interaction
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockRecords: LandRecord[] = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        owner: "0x" + Math.random().toString(36).substring(2, 10),
        location: "Sample Location " + (i + 1),
        landArea: (i + 1) * 100,
        cropHistory: "Wheat, Rice",
        documentHash: "Qm" + Math.random().toString(36).substring(2, 15),
        timestamp: new Date(Date.now() - i * 100000000).toISOString(),
      }))

      const success = Math.random() > 0.05 // Simulate occasional failures
      if (success) {
        resolve({ success: true, records: mockRecords })
      } else {
        resolve({ success: false, error: "Failed to fetch land records from blockchain" })
      }
    }, 1000) // Simulate network latency
  })
}

export function getIPFSUrl(hash: string): string {
  return `https://ipfs.io/ipfs/${hash}`
}
