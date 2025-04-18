import { type NextRequest, NextResponse } from "next/server"
import { digilockerService } from "@/lib/digilocker-service"

export async function GET(req: NextRequest) {
  try {
    // Get authorization code from query parameters
    const searchParams = req.nextUrl.searchParams
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const error = searchParams.get("error")

    // Handle error response
    if (error) {
      console.error("DigiLocker authorization error:", error)
      return NextResponse.redirect(new URL("/auth/error?error=" + error, req.url))
    }

    // Validate code
    if (!code) {
      console.error("No authorization code received")
      return NextResponse.redirect(new URL("/auth/error?error=no_code", req.url))
    }

    // Exchange code for token
    const tokenResponse = await digilockerService.getAccessToken(code)

    // Get user details
    const userDetails = await digilockerService.getUserDetails(tokenResponse.access_token)

    // In a real implementation, you would:
    // 1. Store the token securely (e.g., in a server-side session)
    // 2. Create or update the user in your database
    // 3. Set a secure HTTP-only cookie for authentication

    // For this demo, we'll redirect to a success page with some user info
    const redirectUrl = new URL("/auth/success", req.url)
    redirectUrl.searchParams.set("name", userDetails.name)
    redirectUrl.searchParams.set("id", userDetails.digilockerid)

    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error("Error in DigiLocker callback:", error)
    return NextResponse.redirect(new URL("/auth/error?error=server_error", req.url))
  }
}
