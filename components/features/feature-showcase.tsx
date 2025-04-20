"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  MessageSquareCode,
  Code2,
  Workflow,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    id: "ai-chat",
    title: "AI-Powered Chat",
    description:
      "Our advanced AI chat assistant understands context, learns from your interactions, and provides intelligent responses to help you solve problems faster. From answering complex questions to generating content, our AI is your productivity partner.",
    icon: MessageSquareCode,
    color: "from-purple-500 to-indigo-600",
    image: "/thinkflowgpt-ai-chat.jpeg",
    alt: "AI-Powered Chat Interface",
    points: [
      "Natural language understanding",
      "Context-aware conversations",
      "Multi-language support",
      "Knowledge base integration",
    ],
  },
  {
    id: "code-assistance",
    title: "Code Assistance",
    description:
      "Write better code faster with intelligent suggestions, automatic bug detection, and optimization recommendations. Our code assistant supports multiple programming languages and integrates with your favorite development environments.",
    icon: Code2,
    color: "from-blue-500 to-cyan-600",
    image: "/thinkflowgpt-ai-code-assistant.jpeg",
    alt: "Code Assistance Interface",
    points: [
      "Syntax highlighting and error detection",
      "Code completion and suggestions",
      "Refactoring recommendations",
      "Documentation generation",
    ],
  },
  {
    id: "workflow",
    title: "Workflow Automation",
    description:
      "Create powerful automation workflows with our intuitive drag-and-drop interface. Connect your favorite tools, define triggers and actions, and let ThinkFlowGPT handle repetitive tasks while you focus on what matters most.",
    icon: Workflow,
    color: "from-green-500 to-emerald-600",
    image: "/thinkflowgpt-workflow-automation.jpeg",
    alt: "Workflow Automation Interface",
    points: [
      "Visual workflow builder",
      "Hundreds of app integrations",
      "Conditional logic and branching",
      "Scheduled and event-triggered automation",
    ],
  },
  {
    id: "dashboard",
    title: "Business Dashboard",
    description:
      "Gain valuable insights into your operations with our comprehensive business dashboard. Monitor key metrics, track automation performance, and visualize data to make informed decisions that drive growth and efficiency.",
    icon: LayoutDashboard,
    color: "from-orange-500 to-amber-600",
    image: "/thinkflowgpt-bussiness-dashboard.jpeg",
    alt: "Business Dashboard Interface",
    points: [
      "Customizable widgets and layouts",
      "Real-time data visualization",
      "Performance metrics tracking",
      "Exportable reports and analytics",
    ],
  },
  {
    id: "security",
    title: "Secure Authentication",
    description:
      "Protect your data and workflows with enterprise-grade security features. Our multi-factor authentication, role-based access control, and end-to-end encryption ensure that your information stays safe and compliant with industry standards.",
    icon: ShieldCheck,
    color: "from-red-500 to-rose-600",
    image: "/thinkflowgpt-security-authentication.jpeg",
    alt: "Secure Authentication Interface",
    points: [
      "Multi-factor authentication",
      "Role-based access control",
      "End-to-end encryption",
      "Compliance with industry standards",
    ],
  },
  {
    id: "execution",
    title: "Real-time Execution",
    description:
      "Experience lightning-fast performance with our cloud infrastructure optimized for real-time execution. Your workflows run instantly, providing immediate results and feedback to keep your business moving at the speed of thought.",
    icon: Zap,
    color: "from-yellow-500 to-amber-600",
    image: "/thinkflowgpt-realtime-execution.jpeg",
    alt: "Real-time Execution Interface",
    points: [
      "High-performance cloud infrastructure",
      "Instant workflow execution",
      "Real-time status monitoring",
      "Scalable processing capacity",
    ],
  },
];

export default function FeatureShowcase() {
  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        {features.map((feature, index) => (
          <FeatureDetail
            key={feature.id}
            feature={feature}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
}

function FeatureDetail({
  feature,
  reverse,
}: {
  feature: (typeof features)[0];
  reverse: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Change the useInView configuration to keep animations visible
  // Set once: true to ensure animations stay visible after they appear
  // Increase threshold to 0.2 for earlier triggering
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <div
      id={feature.id}
      ref={sectionRef}
      className="mb-32 last:mb-0 scroll-mt-20"
    >
      <div
        className={`flex flex-col ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        } gap-12 items-center`}
      >
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          animate={
            isInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: reverse ? 50 : -50 }
          }
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:w-1/2"
        >
          <div
            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}
          >
            <feature.icon className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-3xl font-bold mb-4 text-white">
            {feature.title}
          </h2>

          <p className="text-gray-300 text-lg mb-6">{feature.description}</p>

          <ul className="space-y-3 mb-8">
            {feature.points.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                }
                // Add a slightly longer delay for each list item
                transition={{ duration: 0.5, delay: 0.15 * index }}
                className="flex items-start"
              >
                <div
                  className={`mt-1 mr-3 w-5 h-5 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-gray-200">{point}</span>
              </motion.li>
            ))}
          </ul>

          <Link
            href={`/features/${feature.id}`}
            className="group inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium transition-all hover:from-purple-700 hover:to-purple-900"
          >
            See It in Action
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: reverse ? -50 : 50 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1, x: 0 }
              : { opacity: 0, scale: 0.9, x: reverse ? -50 : 50 }
          }
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:w-1/2"
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-purple-900/30 bg-gradient-to-br from-gray-900 to-black p-1">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-purple-800/10 opacity-50" />

            {/* Browser-like frame */}
            <div className="relative rounded-lg overflow-hidden">
              <div className="bg-gray-900 px-4 py-2 flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 bg-gray-800 rounded-md h-6 flex items-center justify-center">
                  <div className="w-3/4 h-2 bg-gray-700 rounded-full"></div>
                </div>
              </div>

              <div className="relative aspect-[4/3] bg-gray-950">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.alt}
                  fill
                  className="object-cover"
                />

                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/0 via-purple-600/0 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
