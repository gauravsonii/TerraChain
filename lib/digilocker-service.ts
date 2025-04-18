// DigiLocker Integration Service
// Based on DigiLocker Authorized Partner API Specification v1.11

interface DigiLockerConfig {
  clientId: string
  redirectUri: string
  responseType: string
  state?: string
}

interface DigiLockerTokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  digilockerid: string
  name: string
  dob?: string
  gender?: string
  eaadhaar?: string
}

interface DigiLockerDocument {
  name: string
  type: string
  size: number
  date: string
  mime: string
  uri: string
  doctype: string
  description: string
  issuerid: string
  issuer: string
}

export class DigiLockerService {
  private static instance: DigiLockerService
  private baseUrl = "https://api.digitallocker.gov.in"
  private config: DigiLockerConfig

  private constructor() {
    this.config = {
      clientId: process.env.DIGILOCKER_CLIENT_ID || "",
      redirectUri: process.env.DIGILOCKER_REDIRECT_URI || "",
      responseType: "code",
    }
  }

  public static getInstance(): DigiLockerService {
    if (!DigiLockerService.instance) {
      DigiLockerService.instance = new DigiLockerService()
    }
    return DigiLockerService.instance
  }

  /**
   * Generate the DigiLocker authorization URL
   */
  public getAuthorizationUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: this.config.responseType,
      state: state || Math.random().toString(36).substring(2, 15),
    })

    return `${this.baseUrl}/public/oauth2/1/authorize?${params.toString()}`
  }

  /**
   * Exchange authorization code for access token
   */
  public async getAccessToken(code: string): Promise<DigiLockerTokenResponse> {
    try {
      // In a real implementation, this would make an actual API call
      // For now, we'll simulate the response
      console.log("Exchanging code for token:", code)

      // Simulated response
      return {
        access_token: "simulated_access_token",
        refresh_token: "simulated_refresh_token",
        expires_in: 3600,
        token_type: "Bearer",
        digilockerid: "DL" + Math.floor(Math.random() * 1000000),
        name: "Test User",
        dob: "1990-01-01",
        gender: "M",
      }
    } catch (error) {
      console.error("Error getting access token:", error)
      throw new Error("Failed to get access token")
    }
  }

  /**
   * Get user details from DigiLocker
   */
  public async getUserDetails(accessToken: string): Promise<any> {
    try {
      // In a real implementation, this would make an actual API call
      console.log("Getting user details with token:", accessToken)

      // Simulated response
      return {
        digilockerid: "DL" + Math.floor(Math.random() * 1000000),
        name: "Test User",
        dob: "1990-01-01",
        gender: "M",
        eaadhaar: "XXXX-XXXX-" + Math.floor(Math.random() * 10000),
      }
    } catch (error) {
      console.error("Error getting user details:", error)
      throw new Error("Failed to get user details")
    }
  }

  /**
   * Get issued documents from DigiLocker
   */
  public async getIssuedDocuments(accessToken: string): Promise<DigiLockerDocument[]> {
    try {
      // In a real implementation, this would make an actual API call
      console.log("Getting issued documents with token:", accessToken)

      // Simulated response
      return [
        {
          name: "Land Deed",
          type: "LAND_RECORD",
          size: 245760,
          date: "2022-03-10",
          mime: "application/pdf",
          uri: "https://api.digitallocker.gov.in/public/oauth2/1/file/land_deed.pdf",
          doctype: "LAND_DEED",
          description: "Land Deed Document",
          issuerid: "REVENUE_DEPT",
          issuer: "Revenue Department",
        },
        {
          name: "Property Tax Receipt",
          type: "TAX_RECEIPT",
          size: 128000,
          date: "2023-01-15",
          mime: "application/pdf",
          uri: "https://api.digitallocker.gov.in/public/oauth2/1/file/tax_receipt.pdf",
          doctype: "TAX_RECEIPT",
          description: "Property Tax Receipt",
          issuerid: "MUNICIPAL_CORP",
          issuer: "Municipal Corporation",
        },
      ]
    } catch (error) {
      console.error("Error getting issued documents:", error)
      throw new Error("Failed to get issued documents")
    }
  }

  /**
   * Get a specific document from DigiLocker
   */
  public async getDocument(accessToken: string, uri: string): Promise<any> {
    try {
      // In a real implementation, this would make an actual API call
      console.log("Getting document with token:", accessToken, "and URI:", uri)

      // Simulated response - in reality, this would return the file content
      return {
        fileName: uri.split("/").pop(),
        fileContent: "Base64EncodedFileContentWouldBeHere",
        mimeType: "application/pdf",
      }
    } catch (error) {
      console.error("Error getting document:", error)
      throw new Error("Failed to get document")
    }
  }
}

// Export singleton instance
export const digilockerService = DigiLockerService.getInstance()
