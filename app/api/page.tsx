"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ApiOverview } from "@/components/api-overview";
import { ApiEndpoints } from "@/components/api-endpoints";
import { ApiAuthentication } from "@/components/api-authentication";
import { ApiUsage } from "@/components/api-usage";
import { ApiCTA } from "@/components/api-cta";
import { Code, Terminal, Zap, Database, Lock, Cpu } from "lucide-react";
import ParticleBackground from "@/components/features/particle-background";
import { SparklesCore } from "@/components/sparkles";

export default function ApiPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.95]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1 relative overflow-hidden">
        {/* Hero Section with Enhanced Background */}
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-purple-950/50 to-black">
          {/* Particle Background */}
          <ParticleBackground />

          {/* Additional ambient effects */}
          <div className="absolute inset-0">
            <SparklesCore
              id="tsparticlesapi"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={30}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-purple-950/50 to-black" />
            <div className="absolute top-0 -left-[10%] w-[70%] aspect-square rounded-full bg-purple-900/30 blur-3xl animate-pulse" />
            <div className="absolute bottom-0 -right-[10%] w-[70%] aspect-square rounded-full bg-purple-800/30 blur-3xl animate-pulse delay-700" />
          </div>

          <motion.section
            style={{ opacity, scale }}
            className="container relative z-10 py-20 md:py-32 lg:py-40"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-6 flex items-center justify-center space-x-2 rounded-full bg-purple-900/30 px-4 py-1 text-sm text-purple-200 backdrop-blur-md"
              >
                <Code className="h-4 w-4 text-purple-400" />
                <span>Developer-friendly API</span>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400"
              >
                ThinkFlowGPT API
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-6 max-w-[85%] text-lg text-purple-100/80 sm:text-xl"
              >
                Integrate AI-powered capabilities directly into your
                applications with our robust API.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
              >
                {[
                  {
                    icon: <Zap className="h-5 w-5 text-purple-400" />,
                    text: "Fast Response",
                  },
                  {
                    icon: <Lock className="h-5 w-5 text-purple-400" />,
                    text: "Secure",
                  },
                  {
                    icon: <Database className="h-5 w-5 text-purple-400" />,
                    text: "Scalable",
                  },
                  {
                    icon: <Cpu className="h-5 w-5 text-purple-400" />,
                    text: "AI-Powered",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-purple-900/20 backdrop-blur-md border border-purple-500/20"
                  >
                    {item.icon}
                    <span className="mt-2 text-sm text-purple-100">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.section>
        </div>

        {/* Terminal-like Code Preview with Enhanced Styling */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="container -mt-32 md:-mt-40 relative z-20 mb-16"
        >
          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.3)] border border-purple-500/30 backdrop-blur-sm">
              <div className="bg-black/60 backdrop-blur-md px-4 py-3 flex items-center border-b border-purple-500/20">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-purple-200/80 text-sm flex items-center">
                  <Terminal className="h-4 w-4 mr-2" />
                  <span>ThinkFlowGPT API Example</span>
                </div>
              </div>
              <div className="bg-black/40 backdrop-blur-md p-8 text-sm font-mono">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-green-400">response</span>{" "}
                  <span className="text-white">=</span>{" "}
                  <span className="text-purple-400">await</span>{" "}
                  <span className="text-yellow-300">fetch</span>
                  <span className="text-white">(</span>
                  <span className="text-green-300">
                    'https://api.thinkflowgpt.com/v1/generate'
                  </span>
                  <span className="text-white">,</span>{" "}
                  <span className="text-white">{"{"}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="ml-8"
                >
                  <span className="text-purple-300">method</span>
                  <span className="text-white">:</span>{" "}
                  <span className="text-green-300">'POST'</span>
                  <span className="text-white">,</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="ml-8"
                >
                  <span className="text-purple-300">headers</span>
                  <span className="text-white">:</span>{" "}
                  <span className="text-white">{"{"}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="ml-16"
                >
                  <span className="text-green-300">'Content-Type'</span>
                  <span className="text-white">:</span>{" "}
                  <span className="text-green-300">'application/json'</span>
                  <span className="text-white">,</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  className="ml-16"
                >
                  <span className="text-green-300">'Authorization'</span>
                  <span className="text-white">:</span>{" "}
                  <span className="text-green-300">'Bearer YOUR_API_KEY'</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                  className="ml-8"
                >
                  <span className="text-white">{"}"},</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.0, duration: 0.5 }}
                  className="ml-8"
                >
                  <span className="text-purple-300">body</span>
                  <span className="text-white">:</span>{" "}
                  <span className="text-yellow-300">JSON.stringify</span>
                  <span className="text-white">({"{"}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2, duration: 0.5 }}
                  className="ml-16"
                >
                  <span className="text-purple-300">prompt</span>
                  <span className="text-white">:</span>{" "}
                  <span className="text-green-300">
                    'Generate a creative marketing tagline for an AI product'
                  </span>
                  <span className="text-white">,</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.4, duration: 0.5 }}
                  className="ml-16"
                >
                  <span className="text-purple-300">max_tokens</span>
                  <span className="text-white">:</span>{" "}
                  <span className="text-yellow-300">50</span>
                  <span className="text-white">,</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.6, duration: 0.5 }}
                  className="ml-16"
                >
                  <span className="text-purple-300">temperature</span>
                  <span className="text-white">:</span>{" "}
                  <span className="text-yellow-300">0.7</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.8, duration: 0.5 }}
                  className="ml-8"
                >
                  <span className="text-white">{"}"})</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.0, duration: 0.5 }}
                >
                  <span className="text-white">{"}"})</span>
                  <span className="text-white">;</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.2, duration: 0.5 }}
                  className="mt-4"
                >
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-green-400">data</span>{" "}
                  <span className="text-white">=</span>{" "}
                  <span className="text-purple-400">await</span>{" "}
                  <span className="text-green-400">response</span>
                  <span className="text-white">.</span>
                  <span className="text-yellow-300">json</span>
                  <span className="text-white">();</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.4, duration: 0.5 }}
                  className="mt-4"
                >
                  <span className="text-green-400">console</span>
                  <span className="text-white">.</span>
                  <span className="text-yellow-300">log</span>
                  <span className="text-white">(</span>
                  <span className="text-green-400">data</span>
                  <span className="text-white">.</span>
                  <span className="text-purple-300">result</span>
                  <span className="text-white">);</span>{" "}
                  <span className="text-gray-500">
                    // "Unleash Tomorrow's Potential Today with ThinkFlowGPT"
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Sections with Enhanced Background */}
        <div className="relative">
          {/* Background decorations for content sections */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-black to-black" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 -left-1/2 w-full aspect-square bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -right-1/2 w-full aspect-square bg-purple-800/20 rounded-full blur-3xl animate-pulse delay-700" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative space-y-32 pb-24 pt-12"
          >
            <motion.div variants={itemVariants}>
              <ApiOverview />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ApiAuthentication />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ApiEndpoints />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ApiUsage />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ApiCTA />
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
