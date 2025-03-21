"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

type User = {
  id: string
  name: string
  email: string
  image?: string
}

type AuthContextType = {
  user: User | null
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate checking for a stored session
    const storedUser = localStorage.getItem("thinkflow_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async () => {
    setIsLoading(true)
    try {
      // Simulate authentication
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substring(2, 9),
        name: "Demo User",
        email: "demo@example.com",
        image: "/placeholder.svg?height=40&width=40",
      }

      setUser(mockUser)
      localStorage.setItem("thinkflow_user", JSON.stringify(mockUser))

      toast({
        title: "Signed in successfully",
        description: "Welcome to ThinkFlowGPT!",
      })
    } catch (error) {
      console.error("Sign in error:", error)
      toast({
        title: "Sign in failed",
        description: "There was a problem signing you in.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    try {
      setUser(null)
      localStorage.removeItem("thinkflow_user")

      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      })
    } catch (error) {
      console.error("Sign out error:", error)
      toast({
        title: "Sign out failed",
        description: "There was a problem signing you out.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

