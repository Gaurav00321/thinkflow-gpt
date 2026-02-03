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
              Experience the Future of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
                Work & Innovation
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light"
          >
            Advanced AI assistance for coding, writing, and complex problem-solving.
            Seamlessly integrated into your daily workflow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-3xl mx-auto"
          >
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.elements.namedItem('prompt') as HTMLInputElement;
                if (input.value.trim()) {
                  window.location.href = `/chat?message=${encodeURIComponent(input.value)}`;
                }
              }}
              className="relative flex items-center w-full"
            >
              <div className="relative w-full group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 blur"></div>
                <div className="relative flex items-center bg-black rounded-2xl p-2">
                  <input
                    name="prompt"
                    type="text"
                    placeholder="Ask anything or generate code..."
                    className="w-full bg-transparent text-white border-none focus:ring-0 placeholder-gray-500 text-lg px-4 py-3"
                    autoComplete="off"
                  />
                  <Button 
                    type="submit"
                    size="icon"
                    className="h-12 w-12 rounded-xl bg-purple-600 hover:bg-purple-500 transition-colors ml-2"
                  >
                    <ArrowRight className="h-6 w-6 text-white" />
                  </Button>
                </div>
              </div>
            </form>
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
