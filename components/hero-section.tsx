"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/sparkles";
import { FloatingPaper } from "@/components/floating-paper";
import { RoboAnimation } from "@/components/robo-animation";

export function HeroSection() {
  return (
    <div className="relative h-[100vh] flex items-center bg-black/[0.96] bg-grid-white/[0.02]">
      {/* Ambient background with moving particles */}
      <div className="h-full w-full absolute inset-0 z-0 overflow-x-hidden">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={80}
          className="w-full h-screen"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={8} />
      </div>      <div className="container mx-auto px-6 relative z-10 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              The Ultimate AI-Powered SaaS for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
                Businesses & Students
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto"
          >
            Seamless AI-assisted coding, workflow automation, and interactive
            conversations with cutting-edge AI models.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >            <Link href="/chat">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white h-12 px-8 rounded-full shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transform transition-all duration-300 group"
              >
                <span className="flex items-center">
                  <span className="mr-2">Start Creating</span>
                  <span className="relative group-hover:translate-x-1 transition-transform duration-300">
                    <span className="absolute top-0 -left-3 h-full w-8 bg-gradient-to-r from-purple-600/0 via-white/20 to-purple-600/0 rotate-45 animate-shimmer" />
                    <svg
                      className="w-5 h-5 group-hover:scale-110 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </span>
                </span>
              </Button>
            </Link>
            <Link href="/features">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-purple-500 hover:border-purple-400 hover:bg-purple-500/10 h-12 px-8 rounded-full group hover:scale-105 transform transition-all duration-300 backdrop-blur-sm"
              >
                <span className="flex items-center">
                  <span className="mr-2">Discover Possibilities</span>
                  <ArrowRight className="h-4 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Animated robot */}
      <div className="absolute bottom-0 right-0 md:right-10 lg:right-20 w-72 md:w-96 h-72 md:h-96 animate-float">
        <RoboAnimation />
      </div>
    </div>
  );
}
