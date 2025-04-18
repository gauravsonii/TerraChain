"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { AuthProvider } from "@/contexts/auth-context"

export default function AuthProviderClient({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    // Return children without the provider during SSR
    return <>{children}</>
  }

  return <AuthProvider>{children}</AuthProvider>
}
