"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Code2, Workflow, Braces, Terminal, GitBranch } from "lucide-react"

export function FloatingPaper({ count = 5 }) {
  const icons = [Code2, Workflow, Braces, Terminal, GitBranch]
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Update dimensions only on client side
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="relative w-full h-full">
      {mounted && Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}          animate={{
            x: [
              Math.random() * dimensions.width * 0.8 + dimensions.width * 0.1,
              Math.random() * dimensions.width * 0.8 + dimensions.width * 0.1,
              Math.random() * dimensions.width * 0.8 + dimensions.width * 0.1
            ],
            y: [
              Math.random() * dimensions.height * 0.8 + dimensions.height * 0.1,
              Math.random() * dimensions.height * 0.8 + dimensions.height * 0.1,
              Math.random() * dimensions.height * 0.8 + dimensions.height * 0.1
            ],
            rotate: [0, Math.random() > 0.5 ? 360 : -360, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        >          <div className="relative w-16 h-16 bg-gradient-to-br from-purple-900/20 to-purple-600/20 backdrop-blur-sm rounded-lg border border-purple-500/20 flex items-center justify-center transform hover:scale-110 transition-transform group">
            {React.createElement(icons[i % icons.length], {
              className: "w-8 h-8 text-purple-400/50 group-hover:text-purple-400/80 transition-colors",
            })}
            <div className="absolute -inset-px bg-gradient-to-r from-purple-500/10 to-purple-700/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
