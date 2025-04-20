"use client";

import type React from "react";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
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
  // Change to once: true to ensure animations stay visible after they appear
  const isInView = useInView(gridRef, { once: true, amount: 0.2 });

  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          ref={gridRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              Supercharge Your Productivity
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Explore our powerful features designed to transform how you work and
            automate your daily tasks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: feature.delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative bg-gradient-to-br from-gray-900 to-black p-1 rounded-xl overflow-hidden"
    >
      {/* Animated border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />

      <div className="relative bg-black rounded-lg p-6 h-full flex flex-col">
        <div
          className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg`}
        >
          <feature.icon className="h-7 w-7 text-white" />
        </div>

        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
          {feature.title}
        </h3>

        <p className="text-gray-400 mb-5 flex-grow">{feature.description}</p>

        <Link href={`features#${feature.id}`}>
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center text-purple-400 font-medium"
          >
            <span>Learn more</span>
            <ArrowRight className="ml-2 h-4 w-4" />
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
