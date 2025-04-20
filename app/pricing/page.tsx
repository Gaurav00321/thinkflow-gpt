"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PricingFAQ } from "@/components/pricing-faq";
import { PricingCTA } from "@/components/pricing-cta";
import { Check, Sparkles, Star, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

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
                <Star className="h-4 w-4 text-purple-400" />
                <span>Choose Your Perfect Plan</span>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400"
              >
                Simple, Transparent Pricing
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-6 max-w-[85%] text-lg text-purple-100/80 sm:text-xl"
              >
                Choose the plan that's right for you and start transforming your
                workflow with ThinkFlowGPT.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-10 flex items-center justify-center space-x-4"
              >
                <span
                  className={`text-sm ${
                    !isAnnual ? "text-white" : "text-purple-300"
                  }`}
                >
                  Monthly
                </span>
                <Switch
                  checked={isAnnual}
                  onCheckedChange={setIsAnnual}
                  className="data-[state=checked]:bg-purple-600"
                />
                <div className="flex items-center">
                  <span
                    className={`text-sm ${
                      isAnnual ? "text-white" : "text-purple-300"
                    }`}
                  >
                    Annual
                  </span>
                  <span className="ml-2 rounded-full bg-purple-700 px-2 py-0.5 text-xs text-white">
                    Save 20%
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>
        </div>

        {/* Pricing Cards */}
        <div className="container -mt-16 md:-mt-24 relative z-20 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Free",
                price: isAnnual ? "0" : "0",
                description: "Perfect for trying out ThinkFlowGPT",
                features: [
                  "5 AI workflows per month",
                  "Basic templates",
                  "Community support",
                  "1 user",
                ],
                cta: "Get Started",
                icon: <Zap className="h-5 w-5" />,
                popular: false,
              },
              {
                name: "Pro",
                price: isAnnual ? "19" : "24",
                description: "For individuals and small teams",
                features: [
                  "Unlimited AI workflows",
                  "Advanced templates",
                  "Priority support",
                  "5 team members",
                  "Custom integrations",
                  "API access",
                ],
                cta: "Start Free Trial",
                icon: <Sparkles className="h-5 w-5" />,
                popular: true,
              },
              {
                name: "Enterprise",
                price: isAnnual ? "49" : "59",
                description: "For organizations with advanced needs",
                features: [
                  "Unlimited everything",
                  "Dedicated support",
                  "Unlimited team members",
                  "Custom AI models",
                  "Advanced security",
                  "SLA guarantees",
                ],
                cta: "Contact Sales",
                icon: <Shield className="h-5 w-5" />,
                popular: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.2, duration: 0.5 }}
                className={`relative rounded-xl backdrop-blur-md border ${
                  plan.popular
                    ? "border-purple-500 bg-gradient-to-b from-purple-900/40 to-purple-900/10"
                    : "border-purple-800/30 bg-purple-950/20"
                } overflow-hidden`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="text-xs font-medium bg-purple-600 text-white px-3 py-1 rounded-bl-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        plan.popular ? "bg-purple-600" : "bg-purple-900"
                      }`}
                    >
                      {plan.icon}
                    </div>
                    <h3 className="ml-3 text-xl font-bold">{plan.name}</h3>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="ml-1 text-sm text-purple-300">
                        /{isAnnual ? "year" : "month"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-purple-300">
                      {plan.description}
                    </p>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-4 w-4 text-purple-400 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "bg-purple-900 hover:bg-purple-800"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-24 pb-24"
        >
          <motion.div variants={itemVariants}>
            <PricingFAQ />
          </motion.div>
          <motion.div variants={itemVariants}>
            <PricingCTA />
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
