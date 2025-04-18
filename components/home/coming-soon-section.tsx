"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Clock, VoicemailIcon as VoiceIcon, Fingerprint, Scale, Users, MapPin } from "lucide-react"
import Link from "next/link"

export function ComingSoonSection() {
  const upcomingFeatures = [
    {
      title: "AI Price Predictor",
      description: "ML-based land price prediction based on location, size, and market trends.",
      icon: <Clock className="h-8 w-8 text-primary" />,
      eta: "Q1 2026",
    },
    {
      title: "Voice-to-Text Uploader",
      description: "Upload and search for land records using voice commands in multiple Indian languages.",
      icon: <VoiceIcon className="h-8 w-8 text-primary" />,
      eta: "Q2 2026",
    },
    {
      title: "Aadhaar-Linked e-KYC",
      description: "Secure identity verification for land transactions using Aadhaar biometrics.",
      icon: <Fingerprint className="h-8 w-8 text-primary" />,
      eta: "Q3 2026",
    },
    {
      title: "Smart Land Dispute Detection",
      description: "AI-powered system to identify potential land disputes before they escalate.",
      icon: <Scale className="h-8 w-8 text-primary" />,
      eta: "Q3 2026",
    },
    {
      title: "Community Verification",
      description: "Decentralized verification system allowing community members to validate land claims.",
      icon: <Users className="h-8 w-8 text-primary" />,
      eta: "Q4 2026",
    },
    {
      title: "Interactive GIS Mapping",
      description: "Advanced geographical visualization of land parcels with satellite imagery integration.",
      icon: <MapPin className="h-8 w-8 text-primary" />,
      eta: "Q4 2026",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Coming Soon</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Exciting new features on our development roadmap
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {upcomingFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    {feature.icon}
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {feature.eta}
                    </span>
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end">
                    <Link href="/coming-soon">
                      <Button variant="ghost" size="sm">
                        Learn more
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/coming-soon">
            <Button size="lg">View All Upcoming Features</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
