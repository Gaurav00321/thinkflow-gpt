"use client"

import Image from "next/image"
import Link from "next/link"
import { GraduationCap, Briefcase, Linkedin, Github, ArrowRight, Mail, Star, Check } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SparklesCore } from "@/components/sparkles"
import ParticleBackground from "@/components/features/particle-background"

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white overflow-hidden">
      {/* Dynamic background */}
      <ParticleBackground />
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Animated background effects */}
        <div className="absolute inset-0">
          <SparklesCore
            id="tsparticlesabout"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={40}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-purple-950/50 to-black" />
          <div className="absolute top-0 -left-[10%] w-[70%] aspect-square rounded-full bg-purple-900/30 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 -right-[10%] w-[70%] aspect-square rounded-full bg-purple-800/30 blur-3xl animate-pulse delay-700" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center rounded-full border border-purple-300/50 bg-purple-600/30 px-4 py-1.5 mb-8 text-base text-white backdrop-blur-sm">
                <Star className="mr-2 h-4 w-4" />
                Our Vision & Mission
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-300">
                About ThinkFlowGPT
              </h1>
              <p className="text-lg md:text-xl text-white mb-12 max-w-3xl mx-auto leading-relaxed">
                Empowering individuals and businesses to achieve more through intelligent automation and AI-driven solutions
              </p>
              <div className="flex items-center justify-center gap-6 text-white">
                <div className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-purple-300" />
                  <span>AI-Powered</span>
                </div>
                <div className="h-1 w-1 rounded-full bg-purple-300" />
                <div className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-purple-300" />
                  <span>User-Friendly</span>
                </div>
                <div className="h-1 w-1 rounded-full bg-purple-300" />
                <div className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-purple-300" />
                  <span>Secure</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>        {/* Decorative bottom curve and scroll indicator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 116"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full text-purple-900/10"
          >
            <path
              d="M1440 64.5909C1440 64.5909 1088.5 116 720 116C351.5 116 0 64.5909 0 64.5909V0H1440V64.5909Z"
              fill="currentColor"
            />
          </svg>
          <motion.div 
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            
          </motion.div>
        </div>
      </section>

      {/* Main Content */}      
      <section className="container mx-auto px-4 py-24 relative">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <SparklesCore
            id="tsparticlesaboutcontent"
            background="transparent"
            minSize={0.4}
            maxSize={1.0}
            particleDensity={30}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black/80 to-black" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
          <div className="order-2 lg:order-1">
            <div className="space-y-8 relative z-10 backdrop-blur-sm rounded-xl p-8 bg-black/40 transition-all duration-500 group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
                  What is ThinkFlowGPT?
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mb-6" />
                <p className="text-lg text-white/90 leading-relaxed mb-6 backdrop-blur-sm">
                  ThinkFlowGPT is an AI-powered workflow automation assistant designed to revolutionize how tasks are handled. 
                  Built with cutting-edge technology and intuitive design, it empowers both students and businesses to:
                </p>
                <ul className="space-y-4 text-white/90">
                  <li className="flex items-start group/item hover:bg-purple-900/10 p-2 rounded-lg transition-all duration-300">
                    <div className="mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-purple-400 group-hover:item:bg-purple-300 transition-colors" />
                    </div>
                    <span>Automate complex tasks with a user-friendly interface</span>
                  </li>
                  <li className="flex items-start group/item hover:bg-purple-900/10 p-2 rounded-lg transition-all duration-300">
                    <div className="mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-purple-400 group-hover:item:bg-purple-300 transition-colors" />
                    </div>
                    <span>Boost productivity through intelligent process optimization</span>
                  </li>
                  <li className="flex items-start group/item hover:bg-purple-900/10 p-2 rounded-lg transition-all duration-300">
                    <div className="mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-purple-400 group-hover:item:bg-purple-300 transition-colors" />
                    </div>
                    <span>Streamline operations with AI-powered insights</span>
                  </li>
                </ul>
              </motion.div>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/features"
                  className="group inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 text-white font-medium transition-all duration-300 shadow-lg shadow-purple-500/25"
                >
                  Explore Features 
                  <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/chat"
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-black/60 backdrop-blur-sm border-2 border-purple-400/40 hover:border-purple-300/60 hover:bg-purple-900/30 text-white font-medium transition-all duration-300"
                >
                  Try Demo
                </Link>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative transform transition-all duration-500 hover:scale-[1.02] hover:rotate-1">
              {/* Card background with blur effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-purple-900/20 backdrop-blur-xl rounded-2xl transform rotate-2" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-purple-900/20 backdrop-blur-xl rounded-2xl transform -rotate-2" />
              
              {/* Main content card */}
              <div className="relative bg-gradient-to-br from-purple-950/90 to-black border border-purple-400/30 p-8 rounded-2xl backdrop-blur-sm group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/5 to-purple-400/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <div className="aspect-video relative rounded-xl overflow-hidden">
                  <Image
                    src="/thinkflowgpt-ai-chat.jpeg"
                    alt="ThinkFlowGPT Interface"
                    fill
                    className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-purple-600/30 backdrop-blur-sm ring-1 ring-purple-400/40 mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-purple-600/40 group-hover:ring-purple-400/60">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 transform transition-all duration-500 group-hover:scale-105">AI-Powered Automation</h3>
                    <p className="text-lg text-white/95">Transform your workflow with intelligent task automation</p>
                  </div>
                </div>

                {/* Feature highlights */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="bg-purple-900/30 backdrop-blur-sm rounded-lg p-4 border border-purple-400/30 hover:border-purple-400/50 hover:bg-purple-900/40"
                  >
                    <div className="text-white mb-2">Processing Speed</div>
                    <div className="text-2xl font-bold text-white">10x Faster</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="bg-purple-900/30 backdrop-blur-sm rounded-lg p-4 border border-purple-400/30 hover:border-purple-400/50 hover:bg-purple-900/40"
                  >
                    <div className="text-white mb-2">Task Automation</div>
                    <div className="text-2xl font-bold text-white">95% Accurate</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="bg-gradient-to-br from-black to-purple-950/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center lg:justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-600">
                <Image
                  src="/Gaurav Upadhyay.png"
                  alt="Gaurav Upadhyay - Founder of ThinkFlowGPT"
                  width={320}
                  height={320}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-purple-400">About the Founder</h2>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">Gaurav Upadhyay</h3>
              <p className="text-gray-300 mb-6">
                Gaurav Upadhyay is the founder of ThinkFlowGPT. He is a passionate software developer and AI innovator
                currently pursuing an Integrated Master of Computer Applications (IMCA) at Parul University. With a deep
                interest in automation, cloud, and machine learning technologies, Gaurav created ThinkFlowGPT to empower
                individuals and small businesses to do more with less effort through smart AI solutions.
              </p>
              <p className="text-gray-300 mb-8">
                Gaurav believes that the future of productivity lies in intelligent automation, and he is on a mission
                to democratize access to advanced AI tools.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.linkedin.com/in/gauravupadhyay-tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium transition-all"
                >
                  <Linkedin className="mr-2 h-4 w-4" /> Connect on LinkedIn
                </a>
                <a
                  href="https://github.com/Gaurav00321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 rounded-lg bg-black border border-purple-600 hover:bg-purple-900/20 text-white font-medium transition-all"
                >
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
                <a
                  href="mailto:thinkflowgpt@gmail.com"
                  className="inline-flex items-center px-5 py-2.5 rounded-lg bg-black border border-purple-600 hover:bg-purple-900/20 text-white font-medium transition-all"
                >
                  <Mail className="mr-2 h-4 w-4" /> Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-white">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-gradient-to-r from-purple-900/30 to-black p-6 rounded-xl border border-purple-400/30">
            <h3 className="text-xl font-bold mb-3 text-white">What is ThinkFlowGPT?</h3>
            <p className="text-white/90">
              ThinkFlowGPT is an AI-powered workflow automation assistant that helps students and businesses automate
              repetitive tasks, streamline processes, and increase productivity through intelligent solutions. It
              features a user-friendly interface that makes complex automation accessible to everyone.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-900/30 to-black p-6 rounded-xl border border-purple-400/30">
            <h3 className="text-xl font-bold mb-3 text-white">Who is Gaurav Upadhyay?</h3>
            <p className="text-white/90">
              Gaurav Upadhyay is the Founder of ThinkFlowGPT, an AI-driven workflow automation startup revolutionizing business processes with intelligent automation. A passionate software developer and AI enthusiast, Gaurav Upadhyay is dedicated to building innovative, user-centric solutions.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-900/30 to-black p-6 rounded-xl border border-purple-400/30">
            <h3 className="text-xl font-bold mb-3 text-white">How can ThinkFlowGPT help my business?</h3>
            <p className="text-white/90">
              ThinkFlowGPT can help your business by automating repetitive tasks, streamlining workflows, and providing
              intelligent insights that boost productivity. It reduces manual effort, minimizes errors, and allows your
              team to focus on high-value activities instead of routine operations.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-900/30 to-black p-6 rounded-xl border border-purple-400/30">
            <h3 className="text-xl font-bold mb-3 text-white">What technologies does ThinkFlowGPT use?</h3>
            <p className="text-white/90">
              ThinkFlowGPT leverages cutting-edge AI and machine learning technologies to power its automation
              capabilities. It uses natural language processing, workflow optimization algorithms, and cloud computing
              to deliver intelligent and efficient solutions for task automation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-purple-800/40 to-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Ready to Transform Your Workflow?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students and businesses who are already using ThinkFlowGPT to automate tasks and boost
            productivity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#"
              className="inline-flex items-center px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 text-white font-medium transition-all text-lg"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 rounded-lg bg-black/60 border border-purple-400/40 hover:border-purple-300/60 hover:bg-purple-900/30 text-white font-medium transition-all text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline/Journey Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-white">Our Journey</h2>
        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-purple-700 transform md:translate-x-px"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            <div className="relative flex flex-col md:flex-row items-center md:items-start">
              <div className="order-1 md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                <div className="bg-gradient-to-r from-black to-purple-900/30 p-5 rounded-xl border border-purple-400/30">
                  <h3 className="text-xl font-bold mb-2 text-white">The Idea</h3>
                  <p className="text-white/90">
                    Gaurav identified the need for accessible AI automation tools while working on his university
                    projects.
                  </p>
                </div>
              </div>
              <div className="z-10 order-0 md:order-0 inline-flex h-10 w-10 rounded-full bg-purple-500 text-white justify-center items-center mb-4 md:mb-0 md:mx-auto">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="order-2 md:w-1/2 md:pl-8 hidden md:block"></div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center md:items-start">
              <div className="order-1 md:order-3 md:w-1/2 md:pl-8 mb-4 md:mb-0">
                <div className="bg-gradient-to-r from-purple-900/30 to-black p-5 rounded-xl border border-purple-400/30">
                  <h3 className="text-xl font-bold mb-2 text-white">Development</h3>
                  <p className="text-white/90">
                    The first prototype of ThinkFlowGPT was developed, combining AI capabilities with user-friendly
                    interfaces.
                  </p>
                </div>
              </div>
              <div className="z-10 order-0 md:order-2 inline-flex h-10 w-10 rounded-full bg-purple-500 text-white justify-center items-center mb-4 md:mb-0 md:mx-auto">
                <Briefcase className="h-5 w-5" />
              </div>
              <div className="order-2 md:order-1 md:w-1/2 md:pr-8 md:text-right hidden md:block"></div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center md:items-start">
              <div className="order-1 md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                <div className="bg-gradient-to-r from-black to-purple-900/30 p-5 rounded-xl border border-purple-400/30">
                  <h3 className="text-xl font-bold mb-2 text-white">Launch</h3>
                  <p className="text-white/90">
                    ThinkFlowGPT was officially launched, helping students and small businesses automate their
                    workflows.
                  </p>
                </div>
              </div>
              <div className="z-10 order-0 md:order-0 inline-flex h-10 w-10 rounded-full bg-purple-500 text-white justify-center items-center mb-4 md:mb-0 md:mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="order-2 md:w-1/2 md:pl-8 hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
