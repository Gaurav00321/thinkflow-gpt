"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function FeatureHero() {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-600 to-purple-400 animate-gradient-x">
                Powerful Features
              </span>
              <br />
              <span className="text-white">for Intelligent Automation</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-10 max-w-3xl mx-auto px-4"
          >
            ThinkFlowGPT combines cutting-edge AI technology with intuitive design to deliver a seamless automation
            experience for students and businesses alike.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center gap-4 px-4"
          >
            <Link
              href="/chat"
              className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium transition-all overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center text-sm sm:text-base">
                See It in Action
                <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              href="/pricing"
              className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-transparent border border-purple-600 text-white font-medium transition-all overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10 text-sm sm:text-base">Try for Free</span>
              <span className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Animated down arrow */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <div className="w-6 sm:w-8 h-10 sm:h-12 rounded-full border-2 border-purple-400 flex items-start justify-center p-2">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="w-1 h-3 bg-purple-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
