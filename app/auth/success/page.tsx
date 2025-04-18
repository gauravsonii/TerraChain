"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { useDigiLocker } from "@/contexts/digilocker-context"

export default function DigiLockerSuccess() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useDigiLocker()

  const name = searchParams.get("name")
  const id = searchParams.get("id")

  useEffect(() => {
    // Simulate login with the received data
    if (name && id) {
      login()
    }
  }, [name, id, login])

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Authentication Successful</CardTitle>
          <CardDescription>You have successfully authenticated with DigiLocker</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-2">
            Welcome, <span className="font-semibold">{name || "User"}</span>!
          </p>
          <p className="text-sm text-muted-foreground">Your DigiLocker ID: {id || "Not available"}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
