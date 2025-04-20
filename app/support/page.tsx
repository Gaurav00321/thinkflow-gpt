"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  HelpCircle,
  FileText,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  LifeBuoy,
  Mail,
  Cpu,
  Phone,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    question: "How do I get started with ThinkFlowGPT?",
    answer:
      "To get started, simply sign up for an account by clicking the 'Try for free' button on the homepage. Once you've created your account, you can immediately start using our AI chat assistant. Check out our 'Getting Started' guide in our blog for a more detailed walkthrough.",
  },
  {
    question: "What subscription plans do you offer?",
    answer:
      "We offer several subscription tiers including Free, Pro, Business, and Enterprise plans. Each plan offers different features, usage limits, and support options. Visit our Pricing page to see detailed information about each plan and choose the one that best fits your needs.",
  },
  {
    question: "Can I use ThinkFlowGPT on mobile devices?",
    answer:
      "Yes, ThinkFlowGPT is fully responsive and works on all devices including smartphones and tablets. You can access the platform through any modern web browser without needing to download an app.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your subscription at any time from your account dashboard. Go to Settings > Billing and click on 'Cancel Subscription'. Your plan will remain active until the end of your current billing period.",
  },
  {
    question: "Is my data secure with ThinkFlowGPT?",
    answer:
      "Yes, security is our top priority. We use enterprise-grade encryption to protect your data, and we never sell your information to third parties. You can learn more about our security practices and data policies in our Privacy Policy.",
  },
  {
    question: "Can I export my chat history?",
    answer:
      "Yes, you can export your entire chat history in various formats including PDF, JSON, and plain text. Go to your chat history, select the conversations you want to export, and click the 'Export' button.",
  },
  {
    question: "How can I integrate ThinkFlowGPT with my existing tools?",
    answer:
      "ThinkFlowGPT offers robust API access that allows you to integrate with a wide range of tools. We provide SDKs for popular programming languages and detailed API documentation to help you set up integrations. For more complex integrations, our Enterprise plan includes dedicated integration support.",
  },
  {
    question: "What languages does ThinkFlowGPT support?",
    answer:
      "Currently, ThinkFlowGPT supports English, Spanish, French, German, Japanese, and Chinese, with more languages being added regularly. The quality and capabilities might vary slightly between languages.",
  },
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("faqs");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <HelpCircle className="h-4 w-4 text-purple-400" />
                <span>Support Center</span>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400"
              >
                How can we help?
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-6 max-w-[85%] text-lg text-purple-100/80 sm:text-xl"
              >
                Get the support you need to make the most of ThinkFlowGPT
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
                      placeholder="Search our knowledge base..."
                      className="w-full rounded-lg border-purple-700/50 bg-purple-950/30 pl-10 pr-24 py-6 text-white placeholder:text-purple-300/50 focus:border-purple-500 focus:ring-purple-500/20"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white">
                      Search
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
              >
                {[
                  {
                    icon: <FileText className="h-5 w-5 text-purple-400" />,
                    text: "Documentation",
                  },
                  {
                    icon: <MessageCircle className="h-5 w-5 text-purple-400" />,
                    text: "Community",
                  },
                  {
                    icon: <BookOpen className="h-5 w-5 text-purple-400" />,
                    text: "Tutorials",
                  },
                  {
                    icon: <LifeBuoy className="h-5 w-5 text-purple-400" />,
                    text: "Live Support",
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

        {/* Support Content */}
        <section className="container py-12 md:py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Tabs
              defaultValue="faqs"
              className="w-full"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <div className="flex justify-center mb-8">
                <TabsList className="bg-purple-950/30 border border-purple-700/30 p-1">
                  <TabsTrigger
                    value="faqs"
                    className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    FAQs
                  </TabsTrigger>
                  <TabsTrigger
                    value="guides"
                    className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Guides
                  </TabsTrigger>
                  <TabsTrigger
                    value="community"
                    className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Community
                  </TabsTrigger>
                  <TabsTrigger
                    value="contact"
                    className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="faqs" className="mt-0">
                <motion.div
                  variants={itemVariants}
                  className="max-w-4xl mx-auto space-y-4"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-purple-200/70">
                      Find quick answers to common questions about ThinkFlowGPT
                    </p>
                  </div>

                  {filteredFaqs.length === 0 ? (
                    <div className="text-center py-12">
                      <HelpCircle className="h-12 w-12 mx-auto text-purple-400 mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">
                        No results found
                      </h3>
                      <p className="text-purple-200/70 mb-6">
                        We couldn't find any FAQs matching your search query.
                      </p>
                      <Button
                        onClick={() => setSearchQuery("")}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Clear Search
                      </Button>
                    </div>
                  ) : (
                    filteredFaqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="rounded-lg border border-purple-700/30 bg-purple-950/20 overflow-hidden"
                      >
                        <button
                          className="flex w-full items-center justify-between p-6 text-left"
                          onClick={() => toggleFaq(index)}
                        >
                          <h3 className="text-lg font-medium text-white">
                            {faq.question}
                          </h3>
                          {expandedFaq === index ? (
                            <ChevronUp className="h-5 w-5 text-purple-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-purple-400" />
                          )}
                        </button>
                        <AnimatePresence>
                          {expandedFaq === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-6 pb-6 text-purple-200/80">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="guides" className="mt-0">
                <motion.div
                  variants={itemVariants}
                  className="max-w-4xl mx-auto"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Getting Started Guides
                    </h2>
                    <p className="text-purple-200/70">
                      Step-by-step tutorials to help you make the most of
                      ThinkFlowGPT
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Getting Started with ThinkFlowGPT",
                        description:
                          "Learn the basics and set up your first AI workflow",
                        icon: <Sparkles className="h-5 w-5" />,
                      },
                      {
                        title: "Creating Custom Workflows",
                        description:
                          "Build powerful automation sequences with our no-code editor",
                        icon: <FileText className="h-5 w-5" />,
                      },
                      {
                        title: "Integrating with Your Tools",
                        description:
                          "Connect ThinkFlowGPT with your existing software stack",
                        icon: <Cpu className="h-5 w-5" />,
                      },
                      {
                        title: "Advanced AI Techniques",
                        description:
                          "Take your AI workflows to the next level with advanced features",
                        icon: <BookOpen className="h-5 w-5" />,
                      },
                    ].map((guide, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        className="rounded-lg border border-purple-700/30 bg-purple-950/20 p-6 hover:border-purple-500/50 transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-full bg-purple-900/50 flex items-center justify-center mb-4">
                          {guide.icon}
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">
                          {guide.title}
                        </h3>
                        <p className="text-purple-200/70 mb-4">
                          {guide.description}
                        </p>
                        <Button
                          variant="link"
                          className="text-purple-400 hover:text-purple-300 p-0"
                        >
                          Read Guide →
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="community" className="mt-0">
                <motion.div
                  variants={itemVariants}
                  className="max-w-4xl mx-auto"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Community Support
                    </h2>
                    <p className="text-purple-200/70">
                      Connect with other ThinkFlowGPT users and our team
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Discord Community",
                        description:
                          "Join our active Discord server to chat with other users and get help",
                        button: "Join Discord",
                        icon: <MessageCircle className="h-5 w-5" />,
                      },
                      {
                        title: "User Forums",
                        description:
                          "Browse discussions or start your own thread on our community forums",
                        button: "Visit Forums",
                        icon: <MessageCircle className="h-5 w-5" />,
                      },
                      {
                        title: "GitHub Repository",
                        description:
                          "Contribute to our open source components or report issues",
                        button: "View on GitHub",
                        icon: <FileText className="h-5 w-5" />,
                      },
                    ].map((community, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        className="rounded-lg border border-purple-700/30 bg-purple-950/20 p-6 hover:border-purple-500/50 transition-all duration-300 flex flex-col"
                      >
                        <div className="w-12 h-12 rounded-full bg-purple-900/50 flex items-center justify-center mb-4">
                          {community.icon}
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">
                          {community.title}
                        </h3>
                        <p className="text-purple-200/70 mb-4 flex-grow">
                          {community.description}
                        </p>
                        <Button className="bg-purple-700 hover:bg-purple-600 w-full">
                          {community.button}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="contact" className="mt-0">
                <motion.div
                  variants={itemVariants}
                  className="max-w-4xl mx-auto"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Contact Support
                    </h2>
                    <p className="text-purple-200/70">
                      Get in touch with our support team for personalized help
                    </p>
                  </div>

                  <Card className="border-purple-700/30 bg-purple-950/20">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-xl font-medium text-white mb-4">
                            Contact Options
                          </h3>
                          <ul className="space-y-4">
                            <li className="flex items-start">
                              <Mail className="h-5 w-5 text-purple-400 mt-0.5 mr-3" />
                              <div>
                                <h4 className="font-medium text-white">
                                  Email Support
                                </h4>
                                <p className="text-purple-200/70 text-sm mb-1">
                                  For general inquiries and non-urgent issues
                                </p>
                                <a
                                  href="mailto:support@thinkflowgpt.com"
                                  className="text-purple-400 hover:text-purple-300 text-sm"
                                >
                                  support@thinkflowgpt.com
                                </a>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <MessageCircle className="h-5 w-5 text-purple-400 mt-0.5 mr-3" />
                              <div>
                                <h4 className="font-medium text-white">
                                  Live Chat
                                </h4>
                                <p className="text-purple-200/70 text-sm mb-1">
                                  Available Monday-Friday, 9am-5pm EST
                                </p>
                                <Button
                                  variant="link"
                                  className="text-purple-400 hover:text-purple-300 p-0 h-auto text-sm"
                                >
                                  Start Chat
                                </Button>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <Phone className="h-5 w-5 text-purple-400 mt-0.5 mr-3" />
                              <div>
                                <h4 className="font-medium text-white">
                                  Phone Support
                                </h4>
                                <p className="text-purple-200/70 text-sm mb-1">
                                  For Enterprise customers only
                                </p>
                                <p className="text-purple-400 text-sm">
                                  +1 (800) 123-4567
                                </p>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xl font-medium text-white mb-4">
                            Submit a Ticket
                          </h3>
                          <p className="text-purple-200/70 mb-4">
                            Need more detailed help? Submit a support ticket and
                            our team will get back to you within 24 hours.
                          </p>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">
                            <Link href="/contact" className="flex items-center">
                              <FileText className="h-4 w-4 mr-2" />
                              Create Support Ticket
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 rounded-lg bg-gradient-to-r from-purple-900/30 to-purple-800/20 border border-purple-500/20 p-10 text-center backdrop-blur-md"
          >
            <h2 className="text-2xl font-bold text-white">Still need help?</h2>
            <p className="text-purple-200/70">
              Our team is here to assist you with any specific questions or
              issues
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-purple-700 text-purple-200 hover:bg-purple-800/30"
              >
                <Link href="/docs">Browse Documentation</Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
