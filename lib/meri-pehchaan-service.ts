// Meri Pehchaan Integration Service
// Based on Requester-MeriPehchaan-APISpecification-V2_3

interface MeriPehchaanConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  responseType: string
  scope: string
  state?: string
}

interface MeriPehchaanTokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  id_token: string
}

interface MeriPehchaanUserInfo {
  sub: string
  name: string
  given_name: string
  family_name: string
  email?: string
  phone_number?: string
  gender?: string
  birthdate?: string
  address?: {
    formatted: string
    street_address: string
    locality: string
    region: string
    postal_code: string
    country: string
  }
}

export class MeriPehchaanService {
  private static instance: MeriPehchaanService
  private baseUrl = "https://auth.meripehchaan.gov.in"
  private apiBaseUrl = "https://api.meripehchaan.gov.in"
  private config: MeriPehchaanConfig

  private constructor() {
    this.config = {
      clientId: process.env.MERI_PEHCHAAN_CLIENT_ID || "",
      clientSecret: process.env.MERI_PEHCHAAN_CLIENT_SECRET || "",
      redirectUri: process.env.MERI_PEHCHAAN_REDIRECT_URI || "",
      responseType: "code",
      scope: "openid profile email phone address",
    }
  }

  public static getInstance(): MeriPehchaanService {
    if (!MeriPehchaanService.instance) {
      MeriPehchaanService.instance = new MeriPehchaanService()
    }
    return MeriPehchaanService.instance
  }

  /**
   * Generate the Meri Pehchaan authorization URL
   */
  public getAuthorizationUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: this.config.responseType,
      scope: this.config.scope,
      state: state || Math.random().toString(36).substring(2, 15),
    })

    return `${this.baseUrl}/oauth2/authorize?${params.toString()}`
  }

  /**
   * Exchange authorization code for access token
   */
  public async getAccessToken(code: string): Promise<MeriPehchaanTokenResponse> {
    try {
      // In a real implementation, this would make an actual API call
      console.log("Exchanging code for token:", code)

      // Simulated response
      return {
        access_token: "simulated_access_token",
        refresh_token: "simulated_refresh_token",
        expires_in: 3600,
        token_type: "Bearer",
        id_token: "simulated_id_token",
      }
    } catch (error) {
      console.error("Error getting access token:", error)
      throw new Error("Failed to get access token")
    }
  }

  /**
   * Get user info from Meri Pehchaan
   */
  public async getUserInfo(accessToken: string): Promise<MeriPehchaanUserInfo> {
    try {
      // In a real implementation, this would make an actual API call
      console.log("Getting user info with token:", accessToken)

      // Simulated response
      return {
        sub: "MP" + Math.floor(Math.random() * 1000000),
        name: "Test User",
        given_name: "Test",
        family_name: "User",
        email: "user@example.com",
        phone_number: "+91987654XXXX",
        gender: "M",
        birthdate: "1990-01-01",
        address: {
          formatted: "123, Test Street, Test City, Test State - 123456",
          street_address: "123, Test Street",
          locality: "Test City",
          region: "Test State",
          postal_code: "123456",
          country: "IN",
        },
      }
    } catch (error) {
      console.error("Error getting user info:", error)
      throw new Error("Failed to get user info")
    }
  }
}

// Export singleton instance
export const meriPehchaanService = MeriPehchaanService.getInstance()
