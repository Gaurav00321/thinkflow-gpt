"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useTheme } from "next-themes"

interface CodeBlockProps {
  language: string
  code: string
  showLineNumbers?: boolean
}

export function CodeBlock({ language, code, showLineNumbers = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-4 rounded-md overflow-hidden border">
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-b">
        <span className="text-sm font-medium">{language}</span>
        <Button variant="ghost" size="sm" className="h-8 px-2" onClick={handleCopy}>
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              <span className="text-xs">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              <span className="text-xs">Copy</span>
            </>
          )}
        </Button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={isDark ? vscDarkPlus : vs}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          padding: "1rem",
          fontSize: "0.9rem",
          backgroundColor: isDark ? "hsl(var(--background))" : "hsl(var(--background))",
        }}
        wrapLines={true}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

