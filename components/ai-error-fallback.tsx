"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AIErrorFallbackProps {
  error: Error | string
  resetErrorBoundary?: () => void
}

export function AIErrorFallback({ error, resetErrorBoundary }: AIErrorFallbackProps) {
  const errorMessage = typeof error === "string" ? error : error.message

  return (
    <Alert variant="destructive" className="my-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>AI Response Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>There was an error generating the AI response: {errorMessage}</p>
        {resetErrorBoundary && (
          <Button variant="outline" size="sm" onClick={resetErrorBoundary} className="self-start mt-2">
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}

