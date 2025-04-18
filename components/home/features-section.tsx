"use client"

import { siteConfig } from "@/config/site"
import { Shield, CheckCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function FeaturesSection() {
  // Map feature icons to their components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Shield":
        return <Shield className="h-12 w-12 text-primary" />
      case "CheckCircle":
        return <CheckCircle className="h-12 w-12 text-primary" />
      case "ArrowRight":
        return <ArrowRight className="h-12 w-12 text-primary" />
      default:
        return <Shield className="h-12 w-12 text-primary" />
    }
  }

  return (
    <section className="w-full py-12 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover how TerraChain is transforming land record management
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-12 mt-8">
          {siteConfig.features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-background"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {getIcon(feature.icon)}
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
