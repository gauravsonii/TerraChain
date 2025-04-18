"use client"

import { useState } from "react"
import { useMeriPehchaan } from "@/contexts/meri-pehchaan-context"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

interface MeriPehchaanDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MeriPehchaanDialog({ open, onOpenChange }: MeriPehchaanDialogProps) {
  const { login, loading, error } = useMeriPehchaan()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      await login()
      onOpenChange(false)
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Meri Pehchaan Authentication</DialogTitle>
          <DialogDescription>
            Sign in securely using your Meri Pehchaan account to access government services and land records.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6">
          <div className="mb-6 p-4 bg-primary/10 rounded-full">
            <Shield className="h-12 w-12 text-primary" />
          </div>

          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-2">Secure Government Authentication</h3>
            <p className="text-sm text-muted-foreground">
              Meri Pehchaan provides secure access to your authentic digital identity issued by the Government of India.
            </p>
          </div>

          <div className="space-y-4 w-full">
            <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin mr-2 border-2 border-b-transparent rounded-full" />
                  Connecting to Meri Pehchaan...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Connect with Meri Pehchaan
                </>
              )}
            </Button>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <p className="text-xs text-center text-muted-foreground mt-4">
              By connecting, you agree to allow TerraChain to access your Meri Pehchaan identity for land record
              verification.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
