"use client"

import type { ReactNode } from "react"

// This is a mock Convex provider since we're not actually connecting to Convex in this demo
export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

