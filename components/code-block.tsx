"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

interface CodeBlockProps {
  language: string
  code: string
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-md bg-muted p-4 my-4">
      <div className="absolute right-4 top-4">
        <Button variant="ghost" size="icon" onClick={handleCopy} className="h-6 w-6">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <div className="mb-2 text-xs text-muted-foreground">{language}</div>
      <pre className="overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
    </div>
  )
}

