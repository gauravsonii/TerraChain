"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle, Shield } from "lucide-react"

export default function HomeContent() {
  return (
    <div className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Secure Land Records on the Blockchain
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                TerraChain combines AI intelligence with blockchain authentication to revolutionize land record
                management in India.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/dashboard">
                <Button size="lg" className="gap-1">
                  Explore Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="mx-auto lg:ml-auto flex items-center justify-center">
            <img
              src="/placeholder.svg?height=400&width=550"
              alt="TerraChain Platform"
              width={550}
              height={400}
              className="rounded-lg object-cover shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
            <Shield className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Blockchain Security</h3>
            <p className="text-center text-muted-foreground">
              Immutable records secured by blockchain technology for tamper-proof documentation.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
            <CheckCircle className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">AI Verification</h3>
            <p className="text-center text-muted-foreground">
              Advanced AI algorithms to verify document authenticity and detect potential fraud.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
            <ArrowRight className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Seamless Integration</h3>
            <p className="text-center text-muted-foreground">
              Easy integration with existing land record systems and government databases.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
