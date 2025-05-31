"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Highlight, themes } from "prism-react-renderer"
import { cn } from "@/lib/utils"

interface CodingAgentProps {
  code?: string
  language?: string
  typingSpeed?: number
  fontSize?: string
  className?: string
}

// Shorter code that fits without scrolling
const defaultJavaCode = `/**
 * ThinkFlowGPT - AI Coding Assistant
 */
public class ThinkFlowGPT {
    private final String version = "1.0.0";
    private final String[] capabilities = {
        "Code Generation",
        "Debugging",
        "Optimization"
    };

    public void greetUser(String username) {
        System.out.println("Hello " + username + "!");
        System.out.println("Welcome to ThinkFlowGPT");
    }

    public String generateSolution(String problem) 
    
    `

export const CodingAgent: React.FC<CodingAgentProps> = ({
  code = defaultJavaCode,
  language = "java",
  typingSpeed = 30,
  fontSize = "sm",
  className,
}) => {
  const [displayedCode, setDisplayedCode] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // Track mouse position for cursor interactivity
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0
    let typingInterval: NodeJS.Timeout

    if (isTyping) {
      typingInterval = setInterval(() => {
        if (currentIndex < code.length) {
          setDisplayedCode(code.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          // Reset immediately without delay
          setDisplayedCode("")
          currentIndex = 0
        }
      }, typingSpeed)
    }

    return () => {
      clearInterval(typingInterval)
    }
  }, [code, typingSpeed, isTyping])

  return (
    <div className={cn("relative w-full overflow-hidden rounded-xl", className)}>
      {/* Code editor container with cursor interactivity */}
      <motion.div
        ref={containerRef}
        className="relative z-10 mx-auto w-full max-w-3xl overflow-hidden rounded-lg shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Cursor-following glow effect */}
        {isHovering && (
          <motion.div
            className="pointer-events-none absolute z-0 h-40 w-40 rounded-full bg-purple-500/10 blur-xl"
            animate={{
              x: mousePosition.x - 80,
              y: mousePosition.y - 80,
            }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
          />
        )}

        {/* MacOS-style window header */}
        <div className="relative z-10 flex h-7 items-center bg-black/40 px-4 backdrop-blur-md">
          <div className="mr-2 h-3 w-3 rounded-full bg-[#ff5f56]" />
          <div className="mr-2 h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <div className="mr-4 h-3 w-3 rounded-full bg-[#27c93f]" />
          <div className="flex-1 text-center text-xs font-medium text-gray-300">ThinkFlowGPT.java</div>
          <div className="w-16" /> {/* Spacer to balance the title */}
        </div>

        {/* Glowing border effect */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          initial={{ opacity: 0.5 }}
          animate={{
            boxShadow: [
              "0 0 0 1px rgba(168,85,247,0.2), 0 0 15px 2px rgba(168,85,247,0.2)",
              "0 0 0 1px rgba(168,85,247,0.4), 0 0 25px 3px rgba(168,85,247,0.4)",
              "0 0 0 1px rgba(168,85,247,0.2), 0 0 15px 2px rgba(168,85,247,0.2)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Code editor with syntax highlighting - transparent background */}
        <div
          className={cn(
            "relative h-[400px] bg-black/20 p-4 font-mono backdrop-blur-sm",
            `text-${fontSize}`,
            "transition-all duration-300",
            isHovering ? "bg-black/30" : "bg-black/20",
          )}
        >
          <Highlight
            theme={{
              ...themes.vsDark,
              plain: {
                color: "#f8f8f2",
                backgroundColor: "transparent",
              },
              styles: [
                {
                  types: ["keyword"],
                  style: {
                    color: "#ff007c", // Vibrant hot pink for keywords
                    fontWeight: "bold",
                  },
                },
                {
                  types: ["class-name"],
                  style: {
                    color: "#00e8ff", // Bright cyan for class names
                    fontWeight: "bold",
                  },
                },
                {
                  types: ["function"],
                  style: {
                    color: "#00ffaa", // Bright teal for functions
                    fontStyle: "italic",
                  },
                },
                {
                  types: ["string", "char"],
                  style: {
                    color: "#ffff00", // Bright yellow for strings
                  },
                },
                {
                  types: ["comment", "prolog", "doctype", "cdata"],
                  style: {
                    color: "#7c84a8", // Brighter purple-grey for comments
                    fontStyle: "italic",
                  },
                },
                {
                  types: ["punctuation"],
                  style: {
                    color: "#ff79c6", // Pink for punctuation
                  },
                },
                {
                  types: ["operator"],
                  style: {
                    color: "#ff5555", // Bright red for operators
                  },
                },
                {
                  types: ["property", "tag", "constant", "symbol", "deleted"],
                  style: {
                    color: "#bd93f9", // Purple for properties
                  },
                },
                {
                  types: ["boolean"],
                  style: {
                    color: "#ff9500", // Orange for booleans
                    fontWeight: "bold",
                  },
                },
                {
                  types: ["number"],
                  style: {
                    color: "#ff79ff", // Bright magenta for numbers
                  },
                },
                {
                  types: ["variable"],
                  style: {
                    color: "#50fa7b", // Bright green for variables
                  },
                },
                {
                  types: ["builtin", "char", "constant", "function", "selector", "atrule"],
                  style: {
                    color: "#66d9ef", // Light blue for built-ins
                  },
                },
                {
                  types: ["attr-name"],
                  style: {
                    color: "#ffb86c", // Light orange for attribute names
                  },
                },
                {
                  types: ["inserted"],
                  style: {
                    color: "#a2ff00", // Lime green for inserted code
                  },
                },
              ],
            }}
            code={displayedCode}
            language={language}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={cn(className, "whitespace-pre font-mono")}
                style={{
                  ...style,
                  background: "transparent",
                  fontFamily: "SF Mono, JetBrains Mono, monospace",
                  minHeight: "100%",
                }}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })} className="line">
                    <span className="mr-4 inline-block w-8 select-none text-right text-gray-500 opacity-70">
                      {i + 1}
                    </span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
                {isTyping && (
                  <motion.span
                    className="inline-block h-4 w-2 bg-purple-400"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </pre>
            )}
          </Highlight>

          {/* Interactive cursor elements */}
          {isHovering && (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="pointer-events-none absolute h-1 w-1 rounded-full bg-purple-400"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0],
                    x: mousePosition.x + Math.random() * 40 - 20,
                    y: mousePosition.y + Math.random() * 40 - 20,
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* MacOS-style status bar - removed line/column count */}
        <div className="relative z-10 flex h-6 items-center justify-between bg-black/40 px-4 text-xs text-white backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <span>Java</span>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Spaces: 4</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
