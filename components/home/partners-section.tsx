"use client"

import { motion } from "framer-motion"

export function PartnersSection() {
  const partners = [
    { name: "Ministry of Rural Development", logo: "/placeholder.svg?height=60&width=180" },
    { name: "Digital India", logo: "/placeholder.svg?height=60&width=180" },
    { name: "National Informatics Centre", logo: "/placeholder.svg?height=60&width=180" },
    { name: "MapmyIndia", logo: "/placeholder.svg?height=60&width=180" },
    { name: "DigiLocker", logo: "/placeholder.svg?height=60&width=180" },
  ]

  return (
    <section className="w-full py-12 md:py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Trusted Partners</h2>
            <p className="max-w-[700px] text-muted-foreground">
              Working together to transform land record management across India
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mt-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="h-12 md:h-16 opacity-70 hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
