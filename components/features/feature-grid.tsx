"use client";

import type React from "react";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { SparklesCore } from "@/components/sparkles";
import {
  MessageSquareCode,
  Code2,
  Workflow,
  LayoutDashboard,
  ShieldCheck,
  Zap,
} from "lucide-react";

const features = [
  {
    id: "ai-chat",
    title: "AI-Powered Chat",
    description:
      "Engage with our advanced AI assistant to get instant answers, generate content, and solve complex problems.",
    icon: MessageSquareCode,
    color: "from-purple-500 to-indigo-600",
    delay: 0,
  },
  {
    id: "code-assistance",
    title: "Code Assistance",
    description:
      "Get intelligent code suggestions, bug fixes, and optimizations across multiple programming languages.",
    icon: Code2,
    color: "from-blue-500 to-cyan-600",
    delay: 0.1,
  },
  {
    id: "workflow",
    title: "Workflow Automation",
    description:
      "Create custom automation workflows that connect your tools and streamline repetitive tasks.",
    icon: Workflow,
    color: "from-green-500 to-emerald-600",
    delay: 0.2,
  },
  {
    id: "dashboard",
    title: "Business Dashboard",
    description:
      "Monitor performance metrics, track automation efficiency, and visualize your productivity gains.",
    icon: LayoutDashboard,
    color: "from-orange-500 to-amber-600",
    delay: 0.3,
  },
  {
    id: "security",
    title: "Secure Authentication",
    description:
      "Enterprise-grade security with multi-factor authentication and end-to-end encryption.",
    icon: ShieldCheck,
    color: "from-red-500 to-rose-600",
    delay: 0.4,
  },
  {
    id: "execution",
    title: "Real-time Execution",
    description:
      "Execute your workflows instantly with our high-performance cloud infrastructure.",
    icon: Zap,
    color: "from-yellow-500 to-amber-600",
    delay: 0.5,
  },
];

// Update the FeatureGrid component to keep animations visible
export default function FeatureGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.2 });
  return (
    <section className="py-12 sm:py-20 relative z-10">
      {/* Particle background */}
      <div className="absolute inset-0 overflow-hidden">
        <SparklesCore
          id="tsparticlesfeatures"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={60}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div
          ref={gridRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              Supercharge Your Productivity
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto px-4">
            Explore our powerful features designed to transform how you work and
            automate your daily tasks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  isInView,
}: {
  feature: (typeof features)[0];
  isInView: boolean;
}) {
  return (
    <motion.div      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: feature.delay }}      whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.3 } }}
      className="group relative p-1 rounded-xl overflow-hidden"
    >      {/* Base background with minimal gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-900/30 rounded-xl backdrop-blur-[3px] transition-all duration-300 group-hover:from-purple-900/30 group-hover:to-violet-900/20" />
      
      {/* Border with enhanced contrast */}
      <div className="absolute inset-0 rounded-xl border border-white/10 group-hover:border-purple-500/30 transition-all duration-300" />
      
      {/* Ambient glow for depth */}
      <div className="absolute -inset-3 bg-gradient-to-r from-purple-500/5 via-violet-500/5 to-fuchsia-500/5 rounded-[24px] opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl" />
      
      <div className="relative rounded-lg p-5 sm:p-6 h-full flex flex-col backdrop-blur-[2px]">        <div className={`w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 sm:mb-5 shadow-lg group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-all duration-300 border border-white/20`}
        >
          <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-white via-purple-200 to-purple-300 transition-all duration-300">
          {feature.title}
        </h3>

        <p className="text-sm sm:text-base text-gray-300 group-hover:text-white mb-4 sm:mb-5 flex-grow transition-colors leading-relaxed">
          {feature.description}
        </p>

        <Link href={`features#${feature.id}`}>          <motion.div
            whileHover={{ x: 5 }}            className="flex items-center text-purple-300 hover:text-purple-200 font-medium text-sm sm:text-base transition-all duration-300 group/link"
          >
            <span className="relative">
              Learn more
              <span className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-purple-300/0 via-purple-300/90 to-purple-300/0 opacity-0 group-hover/link:opacity-100 transition-all duration-300 ease-out" />
            </span>
            <ArrowRight className="ml-2 h-4 w-4 transform transition-all duration-300 ease-out group-hover/link:translate-x-1 group-hover/link:text-purple-300" />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
