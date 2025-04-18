"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { AuthDialog } from "@/components/auth/auth-dialog"

export function AuthButton() {
  const [showAuthDialog, setShowAuthDialog] = useState(false)

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setShowAuthDialog(true)}>
        <LogIn className="mr-2 h-4 w-4" />
        Sign In
      </Button>
      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </>
  )
}
