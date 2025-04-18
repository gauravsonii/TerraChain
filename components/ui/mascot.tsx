"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface MascotProps {
  variant?: "default" | "waving" | "pointing" | "thinking"
  size?: "sm" | "md" | "lg"
  className?: string
  withSpeechBubble?: boolean
  speechText?: string
  onSpeechClose?: () => void
}

export function Mascot({
  variant = "default",
  size = "md",
  className,
  withSpeechBubble = false,
  speechText = "Hi! I'm Terra, your land records assistant!",
  onSpeechClose,
}: MascotProps) {
  const [isVisible, setIsVisible] = useState(true)

  // Size mapping
  const sizeMap = {
    sm: { width: 60, height: 60 },
    md: { width: 100, height: 100 },
    lg: { width: 150, height: 150 },
  }

  // Variant mapping to image paths
  const variantMap = {
    default: "/images/mascot/terra-default.png",
    waving: "/images/mascot/terra-waving.png",
    pointing: "/images/mascot/terra-pointing.png",
    thinking: "/images/mascot/terra-thinking.png",
  }

  useEffect(() => {
    if (withSpeechBubble) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onSpeechClose) onSpeechClose()
      }, 8000)

      return () => clearTimeout(timer)
    }
  }, [withSpeechBubble, onSpeechClose])

  return (
    <div className={cn("relative", className)}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <Image
          src={variantMap[variant] || "/placeholder.svg"}
          alt="Terra mascot"
          width={sizeMap[size].width}
          height={sizeMap[size].height}
          className="drop-shadow-md"
        />

        {withSpeechBubble && (
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                className="absolute -top-20 -right-4 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md max-w-[200px] z-10"
              >
                <div className="text-sm font-medium">{speechText}</div>
                <div className="absolute bottom-[-8px] right-6 w-4 h-4 bg-white dark:bg-slate-800 rotate-45"></div>
                <button
                  onClick={() => {
                    setIsVisible(false)
                    if (onSpeechClose) onSpeechClose()
                  }}
                  className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  aria-label="Close"
                >
                  ×
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  )
}
