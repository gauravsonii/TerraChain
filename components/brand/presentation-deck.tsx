"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"

const slides = [
  {
    title: "TerraChain",
    subtitle: "AI x Blockchain-powered Land Record System",
    content: (
      <div className="flex flex-col items-center justify-center h-full">
        <Logo size="lg" />
        <p className="mt-6 text-lg text-center max-w-md">
          Land records, verified. Powered by AI, secured by Blockchain.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">April 2025</p>
      </div>
    ),
  },
  {
    title: "The Problem",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        <div>
          <h3 className="text-xl font-bold mb-4">Land Record Challenges in India</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>Fragmented, paper-based systems</li>
            <li>Lack of transparency leads to disputes</li>
            <li>Difficult to verify authenticity</li>
            <li>Time-consuming manual processes</li>
            <li>Vulnerable to fraud and corruption</li>
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <img src="/images/illustrations/land-records.png" alt="Land Records" className="max-h-64" />
        </div>
      </div>
    ),
  },
  {
    title: "Our Solution",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        <div className="flex items-center justify-center">
          <img src="/images/illustrations/blockchain-security.png" alt="Blockchain Security" className="max-h-64" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">TerraChain Platform</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>Blockchain-secured land records</li>
            <li>AI-powered verification and assistance</li>
            <li>Transparent, immutable record-keeping</li>
            <li>User-friendly interface for all stakeholders</li>
            <li>Integration with existing government systems</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "Key Features",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        <FeatureCard
          title="Secure Authentication"
          description="Login via MetaMask wallet with secure session storage"
          icon="🔒"
        />
        <FeatureCard title="Land Record Checker" description="Search by Owner Name / Land ID / District" icon="🔍" />
        <FeatureCard
          title="Upload & Analyze"
          description="Upload documents and run ML detection for anomalies"
          icon="📤"
        />
        <FeatureCard title="Browse Verified Lands" description="Filter by location and verification status" icon="🌍" />
        <FeatureCard title="TerraBot AI Assistant" description="Chatbot supporting English & Hindi queries" icon="🤖" />
        <FeatureCard title="Tools & Mini-Apps" description="Specialized utilities for land management" icon="🛠️" />
      </div>
    ),
  },
  {
    title: "Technology Stack",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        <div>
          <h3 className="text-xl font-bold mb-4">Frontend</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>Next.js (App Router)</li>
            <li>TypeScript</li>
            <li>TailwindCSS</li>
            <li>Framer Motion</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-4">Backend</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>Supabase (TerraDB)</li>
            <li>Ethereum Smart Contracts</li>
            <li>IPFS for document storage</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">AI & Blockchain</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>LangChain for TerraBot</li>
            <li>MetaMask wallet integration</li>
            <li>Ethereum for smart contracts</li>
            <li>Machine Learning for document analysis</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-4">DevOps</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>Vercel deployment</li>
            <li>GitHub Actions CI/CD</li>
            <li>ESLint & Prettier</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "Roadmap",
    content: (
      <div className="h-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <RoadmapCard quarter="Q1 2025" features={["Initial Launch", "AI Price Predictor", "5 State Pilot"]} />
          <RoadmapCard
            quarter="Q2 2025"
            features={["Voice-to-Text Uploader", "ULPIN Deep Search", "10 State Expansion"]}
          />
          <RoadmapCard
            quarter="Q3 2025"
            features={["Aadhaar-Linked e-KYC", "Smart Land Dispute Detection", "15 State Coverage"]}
          />
          <RoadmapCard
            quarter="Q4 2025"
            features={["Community Verification", "Interactive GIS Mapping", "20 State Coverage"]}
          />
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Vision 2025</h3>
          <p className="text-lg">
            Enable secure, AI-aided land record access across 20 Indian states with 100K+ users by the end of 2025.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Team",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        <TeamMemberCard
          name="Ayush Morbar"
          role="Founder & CEO"
          bio="Leading AI & Blockchain vision"
          image="/team/ayush-morbar.jpg"
        />
        <TeamMemberCard
          name="Confidential"
          role="CTO"
          bio="Blockchain architecture expert"
          image="/team/confidential.jpg"
        />
        <TeamMemberCard
          name="Confidential"
          role="Head of AI"
          bio="AI and machine learning specialist"
          image="/team/confidential.jpg"
        />
      </div>
    ),
  },
  {
    title: "Contact Us",
    content: (
      <div className="flex flex-col items-center justify-center h-full">
        <Logo size="md" />
        <h3 className="text-xl font-bold mt-6 mb-2">Get in Touch</h3>
        <p className="text-center max-w-md mb-6">Interested in learning more about TerraChain or partnering with us?</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ContactCard icon="✉️" title="Email" content="info@terrachain.in" />
          <ContactCard icon="🌐" title="Website" content="www.terrachain.in" />
          <ContactCard icon="📱" title="Phone" content="+91 9876543210" />
        </div>
      </div>
    ),
  },
]

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-3xl mb-2">{icon}</div>
        <h4 className="font-bold">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

function RoadmapCard({ quarter, features }: { quarter: string; features: string[] }) {
  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="font-bold text-primary">{quarter}</h4>
        <ul className="mt-2 space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="text-sm">
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function TeamMemberCard({ name, role, bio, image }: { name: string; role: string; bio: string; image: string }) {
  return (
    <Card>
      <CardContent className="p-4 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
          <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        </div>
        <h4 className="font-bold">{name}</h4>
        <p className="text-sm text-primary">{role}</p>
        <p className="text-sm text-muted-foreground mt-1 text-center">{bio}</p>
      </CardContent>
    </Card>
  )
}

function ContactCard({ icon, title, content }: { icon: string; title: string; content: string }) {
  return (
    <Card>
      <CardContent className="p-4 flex flex-col items-center">
        <div className="text-3xl mb-2">{icon}</div>
        <h4 className="font-bold">{title}</h4>
        <p className="text-sm mt-1">{content}</p>
      </CardContent>
    </Card>
  )
}

export function PresentationDeck() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  return (
    <div className="w-full h-[600px] bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Slide header */}
        <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{slides[currentSlide].title}</h2>
          <div className="text-sm">
            Slide {currentSlide + 1} of {slides.length}
          </div>
        </div>

        {/* Slide content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {slides[currentSlide].content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation controls */}
        <div className="p-4 border-t flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={prevSlide}>
            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
          </Button>
          <Button variant="outline" size="sm" onClick={nextSlide}>
            Next <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
