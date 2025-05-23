"use client"

import { CodingAgent } from "@/components/coding-agent"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

// Particle component for the starfield effect
const Particle = ({ className }: { className?: string }) => {
  return (
    <motion.div
      className={`absolute rounded-full bg-purple-300/80 shadow-glow ${className}`}
      initial={{
        opacity: Math.random() * 0.6 + 0.2,
        scale: Math.random() * 0.6 + 0.2,
      }}
      animate={{
        y: ["0%", "100%"],
        x: `${Math.random() * 10 - 5}%`,
        opacity: [Math.random() * 0.6 + 0.2, Math.random() * 0.8 + 0.4, Math.random() * 0.6 + 0.2],
      }}
      transition={{
        duration: Math.random() * 10 + 15,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `-${Math.random() * 20 + 5}px`,
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
      }}
    />
  )
}

// Neural node component
const NeuralNode = ({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-purple-500/30 shadow-[0_0_15px_5px_rgba(168,85,247,0.4)]"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      initial={{ scale: 0.8, opacity: 0.3 }}
      animate={{
        scale: [0.8, 1.2, 0.8],
        opacity: [0.3, 0.7, 0.3],
        boxShadow: [
          "0 0 10px 2px rgba(168,85,247,0.3)",
          "0 0 20px 5px rgba(168,85,247,0.6)",
          "0 0 10px 2px rgba(168,85,247,0.3)",
        ],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        delay: delay,
        ease: "easeInOut",
      }}
    />
  )
}

// Connection line component
const ConnectionLine = ({
  start,
  end,
  delay,
}: {
  start: { x: number; y: number }
  end: { x: number; y: number }
  delay: number
}) => {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lineRef.current) {
      const dx = end.x - start.x
      const dy = end.y - start.y
      const length = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx) * (180 / Math.PI)

      lineRef.current.style.width = `${length}%`
      lineRef.current.style.transform = `rotate(${angle}deg)`
    }
  }, [start, end])

  return (
    <motion.div
      ref={lineRef}
      className="absolute h-[1px] origin-left bg-gradient-to-r from-purple-500/10 via-purple-400/30 to-purple-500/10"
      style={{
        left: `${start.x}%`,
        top: `${start.y}%`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.1, 0.5, 0.1] }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        delay: delay,
        ease: "easeInOut",
      }}
    />
  )
}

const AgentSection = () => {
  const mainRef = useRef<HTMLDivElement>(null)

  // Neural network nodes and connections
  const nodes = [
    { x: 5, y: 10, size: 12, delay: 0 },
    { x: 15, y: 25, size: 8, delay: 1 },
    { x: 8, y: 40, size: 10, delay: 0.5 },
    { x: 92, y: 15, size: 10, delay: 1.2 },
    { x: 85, y: 35, size: 12, delay: 0.7 },
    { x: 95, y: 60, size: 8, delay: 0.3 },
    { x: 20, y: 70, size: 10, delay: 0.9 },
    { x: 40, y: 85, size: 14, delay: 0.4 },
    { x: 60, y: 75, size: 9, delay: 1.1 },
    { x: 75, y: 90, size: 11, delay: 0.6 },
  ]

  const connections = [
    { start: { x: 5, y: 10 }, end: { x: 15, y: 25 }, delay: 0.2 },
    { start: { x: 15, y: 25 }, end: { x: 8, y: 40 }, delay: 0.5 },
    { start: { x: 92, y: 15 }, end: { x: 85, y: 35 }, delay: 0.8 },
    { start: { x: 85, y: 35 }, end: { x: 95, y: 60 }, delay: 0.3 },
    { start: { x: 8, y: 40 }, end: { x: 20, y: 70 }, delay: 0.7 },
    { start: { x: 20, y: 70 }, end: { x: 40, y: 85 }, delay: 0.4 },
    { start: { x: 95, y: 60 }, end: { x: 75, y: 90 }, delay: 0.6 },
    { start: { x: 40, y: 85 }, end: { x: 60, y: 75 }, delay: 0.9 },
    { start: { x: 60, y: 75 }, end: { x: 75, y: 90 }, delay: 0.5 },
  ]

  return (
    <main
      ref={mainRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black p-4"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-purple-950/30" />

      {/* Starfield particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => (
          <Particle key={i} />
        ))}
      </div>

      {/* Neural network nodes and connections */}
      <div className="absolute inset-0">
        {nodes.map((node, i) => (
          <NeuralNode key={i} {...node} />
        ))}
        {connections.map((connection, i) => (
          <ConnectionLine key={i} {...connection} />
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-10 max-w-4xl px-4">
        <h1 className="mb-6 text-center text-4xl font-bold text-white md:text-5xl">
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            ThinkFlowGPT
          </span>
        </h1>
        <p className="mb-8 text-center text-lg text-gray-300">The future of software development, coded with intelligence.</p>

        <div className="flex justify-center">
          <CodingAgent />
        </div>
      </div>
    </main>
  )
}

export default AgentSection
