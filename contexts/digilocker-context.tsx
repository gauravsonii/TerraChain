"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define types for DigiLocker user
export interface DigiLockerUser {
  id: string
  name: string
  dob?: string
  gender?: string
  aadhaar?: string
  email?: string
  mobile?: string
  profileImage?: string
  isAuthenticated: boolean
}

// Define context type
interface DigiLockerContextType {
  user: DigiLockerUser | null
  loading: boolean
  error: string | null
  login: () => void
  logout: () => void
}

// Create context with default values
const DigiLockerContext = createContext<DigiLockerContextType>({
  user: null,
  loading: false,
  error: null,
  login: () => {},
  logout: () => {},
})

// Hook to use the DigiLocker context
export const useDigiLocker = () => useContext(DigiLockerContext)

// DigiLocker Provider component
export function DigiLockerProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DigiLockerUser | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // In a real implementation, this would verify the session with the backend
        const savedUser = localStorage.getItem("digilocker_user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (err) {
        console.error("Error checking DigiLocker session:", err)
        setError("Failed to restore session")
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  // Login function - in a real implementation, this would redirect to DigiLocker OAuth
  const login = () => {
    setLoading(true)
    setError(null)

    // Simulate DigiLocker authentication
    setTimeout(() => {
      try {
        // Mock user data - in production, this would come from DigiLocker
        const mockUser: DigiLockerUser = {
          id: "DL" + Math.floor(Math.random() * 1000000),
          name: "Test User",
          dob: "1990-01-01",
          gender: "M",
          aadhaar: "XXXX-XXXX-" + Math.floor(Math.random() * 10000),
          email: "user@example.com",
          mobile: "98XXXXXXXX",
          isAuthenticated: true,
        }

        setUser(mockUser)
        localStorage.setItem("digilocker_user", JSON.stringify(mockUser))
      } catch (err) {
        console.error("Error during DigiLocker login:", err)
        setError("Authentication failed")
      } finally {
        setLoading(false)
      }
    }, 1500) // Simulate network delay
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("digilocker_user")
  }

  return (
    <DigiLockerContext.Provider value={{ user, loading, error, login, logout }}>{children}</DigiLockerContext.Provider>
  )
}
