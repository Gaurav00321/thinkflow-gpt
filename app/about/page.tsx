import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { GraduationCap, Briefcase, Linkedin, Github, ArrowRight, Mail } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "About ThinkFlowGPT | AI-Powered Workflow Automation",
  description:
    "Learn about ThinkFlowGPT, an AI-powered workflow automation assistant founded by Gaurav Upadhyay to simplify tasks and boost productivity for students and businesses.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <Navbar />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              About ThinkFlowGPT
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Empowering productivity through intelligent automation
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-purple-400">What is ThinkFlowGPT?</h2>
            <p className="text-gray-300 mb-6">
              ThinkFlowGPT is an AI-powered workflow automation assistant designed to simplify tasks, boost
              productivity, and streamline operations for both students and businesses. Built with modern technology and
              intuitive design, it enables users to automate complex tasks using a user-friendly interface.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/features"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium transition-all"
              >
                Explore Features <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-black border border-purple-600 hover:bg-purple-900/20 text-white font-medium transition-all"
              >
                See Demo
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2 bg-gradient-to-br from-purple-900/30 to-black p-8 rounded-2xl">
            <div className="aspect-video relative rounded-xl overflow-hidden bg-gradient-to-br from-purple-800/20 to-black flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
              <div className="relative z-10 text-center p-6">
                <div className="inline-block p-3 bg-purple-900/50 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-purple-400"
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
                <h3 className="text-xl font-bold text-white mb-2">AI-Powered Automation</h3>
                <p className="text-gray-300">Streamline your workflow with intelligent task automation</p>
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
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-purple-400">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-gradient-to-r from-purple-900/20 to-black p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3 text-white">What is ThinkFlowGPT?</h3>
            <p className="text-gray-300">
              ThinkFlowGPT is an AI-powered workflow automation assistant that helps students and businesses automate
              repetitive tasks, streamline processes, and increase productivity through intelligent solutions. It
              features a user-friendly interface that makes complex automation accessible to everyone.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-900/20 to-black p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3 text-white">Who is Gaurav Upadhyay?</h3>
            <p className="text-gray-300">
              Gaurav Upadhyay is a software developer, AI innovator, and the founder of ThinkFlowGPT. He is currently
              pursuing an Integrated Master of Computer Applications (IMCA) at Parul University. Gaurav specializes in
              automation, cloud technologies, and machine learning, and is passionate about making advanced AI tools
              accessible to everyone.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-900/20 to-black p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3 text-white">How can ThinkFlowGPT help my business?</h3>
            <p className="text-gray-300">
              ThinkFlowGPT can help your business by automating repetitive tasks, streamlining workflows, and providing
              intelligent insights that boost productivity. It reduces manual effort, minimizes errors, and allows your
              team to focus on high-value activities instead of routine operations.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-900/20 to-black p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3 text-white">What technologies does ThinkFlowGPT use?</h3>
            <p className="text-gray-300">
              ThinkFlowGPT leverages cutting-edge AI and machine learning technologies to power its automation
              capabilities. It uses natural language processing, workflow optimization algorithms, and cloud computing
              to deliver intelligent and efficient solutions for task automation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-purple-900/30 to-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Ready to Transform Your Workflow?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students and businesses who are already using ThinkFlowGPT to automate tasks and boost
            productivity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#"
              className="inline-flex items-center px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium transition-all text-lg"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 rounded-lg bg-black border border-purple-600 hover:bg-purple-900/20 text-white font-medium transition-all text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline/Journey Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-purple-400">Our Journey</h2>
        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-purple-900 transform md:translate-x-px"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            <div className="relative flex flex-col md:flex-row items-center md:items-start">
              <div className="order-1 md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                <div className="bg-gradient-to-r from-black to-purple-900/20 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-2 text-white">The Idea</h3>
                  <p className="text-gray-300">
                    Gaurav identified the need for accessible AI automation tools while working on his university
                    projects.
                  </p>
                </div>
              </div>
              <div className="z-10 order-0 md:order-0 inline-flex h-10 w-10 rounded-full bg-purple-600 text-white justify-center items-center mb-4 md:mb-0 md:mx-auto">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="order-2 md:w-1/2 md:pl-8 hidden md:block"></div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center md:items-start">
              <div className="order-1 md:order-3 md:w-1/2 md:pl-8 mb-4 md:mb-0">
                <div className="bg-gradient-to-r from-purple-900/20 to-black p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-2 text-white">Development</h3>
                  <p className="text-gray-300">
                    The first prototype of ThinkFlowGPT was developed, combining AI capabilities with user-friendly
                    interfaces.
                  </p>
                </div>
              </div>
              <div className="z-10 order-0 md:order-2 inline-flex h-10 w-10 rounded-full bg-purple-600 text-white justify-center items-center mb-4 md:mb-0 md:mx-auto">
                <Briefcase className="h-5 w-5" />
              </div>
              <div className="order-2 md:order-1 md:w-1/2 md:pr-8 md:text-right hidden md:block"></div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center md:items-start">
              <div className="order-1 md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                <div className="bg-gradient-to-r from-black to-purple-900/20 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-2 text-white">Launch</h3>
                  <p className="text-gray-300">
                    ThinkFlowGPT was officially launched, helping students and small businesses automate their
                    workflows.
                  </p>
                </div>
              </div>
              <div className="z-10 order-0 md:order-0 inline-flex h-10 w-10 rounded-full bg-purple-600 text-white justify-center items-center mb-4 md:mb-0 md:mx-auto">
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
