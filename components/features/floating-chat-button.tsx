"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X } from "lucide-react"

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg hover:shadow-purple-500/20 transition-shadow"
        aria-label="Let's Talk AI"
      >
        <div className="absolute inset-0 rounded-full bg-purple-600 animate-ping opacity-20"></div>
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      {/* Chat modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] bg-gray-900 rounded-xl shadow-2xl border border-purple-900/50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-700 to-purple-900 p-4 flex items-center justify-between">
              <h3 className="text-white font-medium flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Let's Talk AI
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat content */}
            <div className="h-[350px] p-4 overflow-y-auto bg-gray-950">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mr-3">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-sm text-gray-200 max-w-[80%]">
                    <p>👋 Hi there! I'm your ThinkFlowGPT assistant. How can I help you today?</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mr-3">
                    <span className="text-white text-xs font-bold">You</span>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-sm text-gray-200 max-w-[80%]">
                    <p>I'd like to learn more about the workflow automation feature.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mr-3">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-sm text-gray-200 max-w-[80%]">
                    <p>
                      Our workflow automation feature allows you to create custom automation sequences with a visual
                      drag-and-drop builder. You can connect hundreds of apps, set up conditional logic, and schedule
                      automated tasks.
                    </p>
                    <p className="mt-2">
                      Would you like me to show you a demo or explain more about specific capabilities?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Input area */}
            <div className="p-3 border-t border-gray-800 bg-gray-900">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button className="ml-2 p-2 rounded-lg bg-purple-600 text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22 2L11 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 2L15 22L11 13L2 9L22 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
