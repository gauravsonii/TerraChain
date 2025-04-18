"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Shield, Database, FileText } from "lucide-react"
import { motion } from "framer-motion"
import { useDigiLocker } from "@/contexts/digilocker-context"

export function HeroSection() {
  const { user } = useDigiLocker()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm">
              <Shield className="mr-1 h-4 w-4" />
              <span className="text-sm font-medium">Secure • Transparent • Efficient</span>
            </div>

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
              <Link href={user ? "/dashboard" : "/browse"}>
                <Button size="lg" className="gap-1">
                  {user ? "Go to Dashboard" : "Explore Records"} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Database className="mr-1 h-4 w-4" />
                <span>10,000+ Records</span>
              </div>
              <div className="flex items-center">
                <FileText className="mr-1 h-4 w-4" />
                <span>Verified Documents</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mx-auto lg:ml-auto flex items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="/images/hero-image.png"
              alt="TerraChain Platform"
              width={550}
              height={400}
              className="rounded-lg object-cover shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
