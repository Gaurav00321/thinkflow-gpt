"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { getCurrentUser, signOutAction } from "@/lib/auth-actions"

type User = {
  id: string
  name?: string
  email?: string
} | null

type AuthContextType = {
  user: User
  loading: boolean
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signOut = async () => {
    try {
      await signOutAction()
      setUser(null)
    } catch (error) {
      console.error("Sign out failed:", error)
    }
  }

  return <AuthContext.Provider value={{ user, loading, signOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
