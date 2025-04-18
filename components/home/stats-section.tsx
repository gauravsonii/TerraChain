"use client"

import { motion } from "framer-motion"
import { Database, FileCheck, Users, Map } from "lucide-react"

export function StatsSection() {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Database className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-3xl font-bold">10,000+</h3>
            <p className="text-muted-foreground">Land Records</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <FileCheck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-3xl font-bold">85%</h3>
            <p className="text-muted-foreground">Verification Rate</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-3xl font-bold">5,000+</h3>
            <p className="text-muted-foreground">Active Users</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Map className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-3xl font-bold">15+</h3>
            <p className="text-muted-foreground">States Covered</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
