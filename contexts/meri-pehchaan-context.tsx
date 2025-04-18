"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define types for Meri Pehchaan user
export interface MeriPehchaanUser {
  id: string
  name: string
  givenName: string
  familyName: string
  email?: string
  phoneNumber?: string
  gender?: string
  birthdate?: string
  address?: {
    formatted: string
    streetAddress: string
    locality: string
    region: string
    postalCode: string
    country: string
  }
  isAuthenticated: boolean
}

// Define context type
interface MeriPehchaanContextType {
  user: MeriPehchaanUser | null
  loading: boolean
  error: string | null
  login: () => void
  logout: () => void
}

// Create context with default values
const MeriPehchaanContext = createContext<MeriPehchaanContextType>({
  user: null,
  loading: false,
  error: null,
  login: () => {},
  logout: () => {},
})

// Hook to use the Meri Pehchaan context
export const useMeriPehchaan = () => useContext(MeriPehchaanContext)

// Meri Pehchaan Provider component
export function MeriPehchaanProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MeriPehchaanUser | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // In a real implementation, this would verify the session with the backend
        const savedUser = localStorage.getItem("meri_pehchaan_user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (err) {
        console.error("Error checking Meri Pehchaan session:", err)
        setError("Failed to restore session")
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  // Login function - in a real implementation, this would redirect to Meri Pehchaan OAuth
  const login = () => {
    setLoading(true)
    setError(null)

    // Simulate Meri Pehchaan authentication
    setTimeout(() => {
      try {
        // Mock user data - in production, this would come from Meri Pehchaan
        const mockUser: MeriPehchaanUser = {
          id: "MP" + Math.floor(Math.random() * 1000000),
          name: "Test User",
          givenName: "Test",
          familyName: "User",
          email: "user@example.com",
          phoneNumber: "+91987654XXXX",
          gender: "M",
          birthdate: "1990-01-01",
          address: {
            formatted: "123, Test Street, Test City, Test State - 123456",
            streetAddress: "123, Test Street",
            locality: "Test City",
            region: "Test State",
            postalCode: "123456",
            country: "IN",
          },
          isAuthenticated: true,
        }

        setUser(mockUser)
        localStorage.setItem("meri_pehchaan_user", JSON.stringify(mockUser))
      } catch (err) {
        console.error("Error during Meri Pehchaan login:", err)
        setError("Authentication failed")
      } finally {
        setLoading(false)
      }
    }, 1500) // Simulate network delay
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("meri_pehchaan_user")
  }

  return (
    <MeriPehchaanContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </MeriPehchaanContext.Provider>
  )
}
