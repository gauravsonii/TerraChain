"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"
import { digilockerService } from "@/lib/digilocker-service"
import { useEffect, useState } from "react"

export default function DigiLockerLogin() {
  const [authUrl, setAuthUrl] = useState("")

  useEffect(() => {
    // Generate a random state for CSRF protection
    const state = Math.random().toString(36).substring(2, 15)

    // Store state in session storage for verification in callback
    sessionStorage.setItem("digilocker_state", state)

    // Get authorization URL
    const url = digilockerService.getAuthorizationUrl(state)
    setAuthUrl(url)
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Shield className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">DigiLocker Authentication</CardTitle>
          <CardDescription>Sign in securely using your DigiLocker account</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6">
            DigiLocker provides secure access to your authentic digital documents issued by the Government of India.
          </p>
          <div className="space-y-4">
            <Button className="w-full" onClick={() => (window.location.href = authUrl)} disabled={!authUrl}>
              <Shield className="mr-2 h-4 w-4" />
              Connect with DigiLocker
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center text-xs text-muted-foreground">
          By connecting, you agree to allow TerraChain to access your DigiLocker documents related to land records.
        </CardFooter>
      </Card>
    </div>
  )
}
