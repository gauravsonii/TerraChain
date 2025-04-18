import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TerraBot } from "@/components/terrabot/floating-assistant"
import { Toaster } from "@/components/ui/toaster"
import { MeriPehchaanProvider } from "@/contexts/meri-pehchaan-context"
import { DigiLockerProvider } from "@/contexts/digilocker-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TerraChain - Blockchain Land Records",
  description: "Secure, transparent land records on the blockchain",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light" attribute="class">
          <MeriPehchaanProvider>
            <DigiLockerProvider>
              {children}
              <TerraBot />
              <Toaster />
            </DigiLockerProvider>
          </MeriPehchaanProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
