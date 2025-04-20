"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogCard } from "@/components/blog-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, ArrowRight, Sparkles } from "lucide-react";

export default function BlogPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const categories = [
    "All",
    "Tutorial",
    "Productivity",
    "Insights",
    "Case Study",
    "Company",
    "AI Ethics",
  ];

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
        {/* Hero Section with Animated Background */}
        <div className="relative overflow-hidden bg-gradient-to-br from-black via-purple-950 to-black">
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 opacity-20">
              {isLoaded && (
                <>
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-purple-500"
                      initial={{
                        x: Math.random() * 100 - 50 + "%",
                        y: Math.random() * 100 - 50 + "%",
                        scale: Math.random() * 0.5 + 0.5,
                        opacity: Math.random() * 0.3 + 0.1,
                      }}
                      animate={{
                        x: [
                          Math.random() * 100 - 50 + "%",
                          Math.random() * 100 - 50 + "%",
                        ],
                        y: [
                          Math.random() * 100 - 50 + "%",
                          Math.random() * 100 - 50 + "%",
                        ],
                      }}
                      transition={{
                        duration: Math.random() * 20 + 10,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                      style={{
                        width: Math.random() * 300 + 50,
                        height: Math.random() * 300 + 50,
                        filter: "blur(80px)",
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          </div>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="container relative z-10 py-20 md:py-32"
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
                <BookOpen className="h-4 w-4 text-purple-400" />
                <span>Insights & Updates</span>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400"
              >
                Our Blog
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-6 max-w-[85%] text-lg text-purple-100/80 sm:text-xl"
              >
                <strong>ThinkFlowGPT</strong> is an AI-powered workflow
                assistant designed to help businesses and students automate
                their daily tasks and boost productivity. Founded by{" "}
                <strong>Gaurav Upadhyay</strong>, ThinkFlowGPT is on a mission
                to bring intelligent, ethical, and user-friendly automation to
                everyone.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative mt-8 w-full max-w-2xl"
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-black rounded-lg">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400" />
                    <Input
                      type="text"
                      placeholder="Search articles..."
                      className="w-full rounded-lg border-purple-700/50 bg-purple-950/30 pl-10 pr-4 py-6 text-white placeholder:text-purple-300/50 focus:border-purple-500 focus:ring-purple-500/20"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>
        </div>

        {/* Featured Post */}
        <div className="container -mt-16 md:-mt-24 relative z-20 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="rounded-xl overflow-hidden border border-purple-500/30 shadow-[0_0_30px_rgba(124,58,237,0.2)] bg-gradient-to-b from-purple-900/40 to-purple-900/10 backdrop-blur-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <Image
                  src="/blog/ai-ethics-thinkflowgpt.png"
                  alt="AI Ethics: Our Approach at ThinkFlowGPT"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-purple-600 hover:bg-purple-700 text-white">
                    Featured
                  </Badge>
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center mb-3">
                  <Badge
                    variant="outline"
                    className="border-purple-500/50 text-purple-300"
                  >
                    AI Ethics
                  </Badge>
                  <span className="text-purple-300 text-sm ml-3">
                    April 11, 2025
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  AI Ethics: Our Approach at ThinkFlowGPT
                </h2>
                <p className="text-purple-200/70 mb-6">
                  How we're building responsible AI systems that prioritize user
                  privacy and ethical considerations. Learn about our commitment
                  to transparency, fairness, and user control.
                </p>
                <Button
                  asChild
                  className="w-fit bg-purple-600 hover:bg-purple-700"
                >
                  <Link
                    href="/blog/ai-ethics-our-approach-at-thinkflowgpt"
                    className="flex items-center"
                  >
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Category Filter */}
        <section className="container mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {categories.map((category) => (
              <Badge
                key={category}
                variant={
                  selectedCategory === category ||
                  (category === "All" && !selectedCategory)
                    ? "default"
                    : "outline"
                }
                className={`cursor-pointer text-sm py-2 px-4 ${
                  selectedCategory === category ||
                  (category === "All" && !selectedCategory)
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "border-purple-500/50 text-purple-300 hover:border-purple-400 hover:bg-purple-900/20"
                }`}
                onClick={() =>
                  setSelectedCategory(category === "All" ? null : category)
                }
              >
                {category}
              </Badge>
            ))}
          </motion.div>
        </section>

        {/* Blog Posts */}
        <section className="container pb-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <motion.div variants={itemVariants}>
              <BlogCard
                title="Getting Started with ThinkFlowGPT"
                description="Learn how to set up and start using ThinkFlowGPT to enhance your productivity."
                date="March 19, 2025"
                category="Tutorial"
                slug="getting-started-with-thinkflowgpt"
                image="/blog/getting-started.png"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <BlogCard
                title="10 Ways AI Can Boost Your Productivity"
                description="Discover how artificial intelligence tools like ThinkFlowGPT can help you work smarter, not harder."
                date="March 27, 2025"
                category="Productivity"
                slug="10-ways-ai-can-boost-productivity-with-thinkflowgpt"
                image="/blog/ai-productivity-with-thinkflowgpt.png"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <BlogCard
                title="The Future of Work with AI Assistants"
                description="How AI assistants are changing the workplace and what to expect in the coming years."
                date="March 30, 2025"
                category="Insights"
                slug="future-of-work-with-ai-assistants"
                image="/blog/ai-assistants.png"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <BlogCard
                title="Building Custom Workflows with ThinkFlowGPT"
                description="A step-by-step guide to creating automated workflows that save you time and effort."
                date="April 7, 2025"
                category="Tutorial"
                slug="building-custom-workflows-with-thinkflowgpt"
                image="/blog/custom-workflows-thinkflowgpt.png"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <BlogCard
                title="AI Ethics: Our Approach at ThinkFlowGPT"
                description="How we're building responsible AI systems that prioritize user privacy and ethical considerations."
                date="April 11, 2025"
                category="Company"
                slug="ai-ethics-our-approach-at-thinkflowgpt"
                image="/blog/ai-ethics-thinkflowgpt.png"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <BlogCard
                title="Case Study: How Company AmTop Increased Efficiency by 40%"
                description="Learn how a leading company leveraged ThinkFlowGPT to transform their operations."
                date="April 18, 2025"
                category="Case Study"
                slug="case-study-amtop-efficiency-boost"
                image="/blog/amtop-case-study.png"
              />
            </motion.div>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-24 rounded-xl overflow-hidden border border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-purple-800/20 p-8 backdrop-blur-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <Sparkles className="h-5 w-5 text-purple-400 mr-2" />
                  <h3 className="text-xl font-bold text-white">Stay Updated</h3>
                </div>
                <p className="text-purple-200/70 mb-4">
                  Subscribe to our newsletter to get the latest insights,
                  tutorials, and updates from ThinkFlowGPT delivered straight to
                  your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-purple-900/20 border-purple-700/30 text-white placeholder:text-purple-400/50 focus:border-purple-500"
                  />
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Subscribe
                  </Button>
                </div>
              </div>
              <div className="hidden md:flex justify-end">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/30 to-purple-800/30 animate-pulse"></div>
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-600/50 to-purple-800/50 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-white/80" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
