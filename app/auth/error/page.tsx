"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function DigiLockerError() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error") || "unknown_error"

  // Map error codes to user-friendly messages
  const errorMessages: Record<string, string> = {
    access_denied: "You denied access to your DigiLocker account.",
    invalid_request: "The authentication request was invalid.",
    server_error: "A server error occurred during authentication.",
    no_code: "No authorization code was received from DigiLocker.",
    unknown_error: "An unknown error occurred during authentication.",
  }

  const errorMessage = errorMessages[error] || errorMessages.unknown_error

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl">Authentication Failed</CardTitle>
          <CardDescription>There was a problem authenticating with DigiLocker</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-destructive mb-4">{errorMessage}</p>
          <p className="text-sm text-muted-foreground">Error code: {error}</p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => router.push("/")}>
            Go Home
          </Button>
          <Button onClick={() => router.push("/auth/login")}>Try Again</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
