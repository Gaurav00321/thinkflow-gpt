"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export default function FeatureCta() {
  const ctaRef = useRef<HTMLDivElement>(null)
  // Change to once: true to ensure animations stay visible after they appear
  const isInView = useInView(ctaRef, { once: true, amount: 0.3 })

  return (
    <section ref={ctaRef} className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black pointer-events-none" />

      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0.3, scale: 0.8 }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="absolute -top-[30%] -left-[10%] w-[70%] aspect-square rounded-full bg-purple-900/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
          className="absolute -bottom-[30%] -right-[10%] w-[70%] aspect-square rounded-full bg-purple-800/10 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                Start Automating Your Workflow Today
              </span>
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join thousands of students and businesses who are already using ThinkFlowGPT to transform their
              productivity and streamline their operations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link
              href="/signup"
              className="group relative inline-flex items-center px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Start Automating Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              href="/demo"
              className="group relative inline-flex items-center px-8 py-4 rounded-lg bg-transparent border border-purple-600 text-white font-medium transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <Sparkles className="mr-2 h-5 w-5" />
                Watch Demo
              </span>
              <span className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
