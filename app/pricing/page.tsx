"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PricingFAQ } from "@/components/pricing-faq";
import { PricingCTA } from "@/components/pricing-cta";
import { Check, Sparkles, Star, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SparklesCore } from "@/components/sparkles";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 relative overflow-hidden bg-black">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32">
          {/* Particle background */}
          <div className="absolute inset-0 overflow-hidden">
            <SparklesCore
              id="tsparticlespricing"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={40}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black pointer-events-none" />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center"
            >
              <div className="inline-flex items-center justify-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 mb-6 text-base text-purple-300 backdrop-blur-sm">
                <Star className="mr-2 h-4 w-4" />
                Simple, Transparent Pricing
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-purple-400 to-purple-600 mb-6">
                Choose Your Perfect Plan
              </h1>

              <p className="text-lg sm:text-xl text-purple-200/80 max-w-[85%] mb-12">
                Start for free, upgrade as you grow. No hidden fees.
              </p>              <div className="inline-flex items-center justify-center space-x-6 bg-purple-950/30 rounded-full px-6 py-3 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/30 hover:bg-purple-950/40 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <span className={`${!isAnnual ? "text-white font-medium" : "text-purple-300"} transition-colors duration-200`}>
                    Monthly
                  </span>
                  <Switch
                    checked={isAnnual}
                    onCheckedChange={setIsAnnual}
                    className="data-[state=checked]:bg-purple-600 data-[state=checked]:shadow-purple-500/50"
                  />
                  <span className={`${isAnnual ? "text-white font-medium" : "text-purple-300"} transition-colors duration-200`}>
                    Annual
                  </span>
                </div>
                <div className="pl-3 border-l border-purple-500/20">
                  <span className="rounded-full bg-gradient-to-r from-purple-600 to-purple-700 px-3 py-1 text-xs font-medium text-white shadow-lg shadow-purple-500/30 ring-1 ring-purple-500/30">
                    Save 20%
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="container relative z-20 -mt-10 mb-24">          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[{
              name: "Free",
              price: "0",
              description: "Perfect for trying out ThinkFlowGPT",
              features: [
                "5 AI workflows per month",
                "Basic templates",
                "Community support",
                "1 user",
              ],
              cta: "Get Started Free",
              icon: <Zap className="h-5 w-5" />,
              popular: false,
            },
            {
              name: "Pro",
              price: isAnnual ? "200" : "24",
              description: "For individuals and growing teams",
              features: [
                "Unlimited AI workflows",
                "Advanced templates",
                "Priority support",
                "5 team members",
                "Custom integrations",
                "API access",
              ],
              cta: "Start 14-Day Trial",
              icon: <Sparkles className="h-5 w-5" />,
              popular: true,
            },
            {
              name: "Enterprise",
              price: isAnnual ? "500" : "59",
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
            }].map((plan) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group relative"
              >
                {/* Card background effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/0 to-purple-900/20 rounded-2xl transform transition-transform duration-500 group-hover:translate-y-[-2px]" />
                <div className="absolute inset-0 rounded-2xl border border-purple-500/20 group-hover:border-purple-500/30 transition-colors duration-500" />
                {plan.popular && (
                  <div className="absolute inset-[-2px] rounded-2xl bg-gradient-to-b from-purple-500/20 via-purple-500/0 to-transparent" />
                )}

                {/* Card content */}
                <div className="relative rounded-2xl bg-black/40 backdrop-blur-xl p-6 h-full flex flex-col">
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <div className="bg-purple-600 text-white text-sm px-4 py-1 rounded-full shadow-lg shadow-purple-500/30">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="flex items-center mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        plan.popular ? "bg-purple-600" : "bg-purple-900/60"
                      } shadow-lg ${
                        plan.popular ? "shadow-purple-500/30" : ""
                      }`}
                    >
                      {plan.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-white">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-purple-300">
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-white">
                        ${plan.price}
                      </span>
                      <span className="ml-2 text-purple-300">
                        /{isAnnual ? "year" : "month"}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-purple-100">
                        <Check className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>                  <Button
                    className={`w-full h-12 rounded-xl text-base font-medium relative overflow-hidden group/button ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 text-white shadow-lg shadow-purple-500/30"
                        : plan.name === "Free"
                        ? "bg-black hover:bg-purple-950 text-purple-300 hover:text-white border-2 border-purple-500/30 hover:border-purple-400/50"
                        : "bg-gradient-to-r from-purple-900/80 to-purple-800/80 hover:from-purple-800/80 hover:to-purple-700/80 text-purple-100 border border-purple-500/30"
                    } transition-all duration-300`}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {plan.cta}
                      {plan.popular && (
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs"
                        >
                          Popular Choice
                        </motion.div>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/10 to-purple-400/0 transform translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-700" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ and CTA Sections */}
        <div className="space-y-24 pb-24">
          <PricingFAQ />
          <PricingCTA />
        </div>
      </main>
      <Footer />
    </div>
  );
}
