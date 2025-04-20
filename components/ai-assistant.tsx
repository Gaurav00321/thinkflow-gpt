"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
};

type QuickQuestion = {
  id: string;
  text: string;
  answer: string;
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your ThinkFlowGPT assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions: QuickQuestion[] = [
    {
      id: "what-is",
      text: "What is ThinkFlowGPT?",
      answer:
        "ThinkFlowGPT is an advanced AI automation platform that helps you streamline workflows, generate content, and build intelligent applications with state-of-the-art AI models.",
    },
    {
      id: "pricing",
      text: "Pricing plans",
      answer:
        "ThinkFlowGPT offers several pricing tiers: Free (limited usage), Pro ($29/month), Business ($99/month), and Enterprise (custom pricing). Each plan includes different API call limits and features.",
    },
    {
      id: "features",
      text: "Key features",
      answer:
        "ThinkFlowGPT offers AI-powered content generation, workflow automation, API access, custom model fine-tuning, and integration with popular tools and platforms.",
    },
    {
      id: "get-started",
      text: "How to get started",
      answer:
        "To get started with ThinkFlowGPT, create an account, choose a plan, and explore our documentation. You can start with our templates or build custom workflows right away.",
    },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: QuickQuestion) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question.text,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: question.answer,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  };

  const getResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    // Check for specific keywords
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! How can I assist you with ThinkFlowGPT today?";
    }

    if (
      lowerMessage.includes("pricing") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("plan")
    ) {
      return "ThinkFlowGPT offers several pricing tiers: Free (limited usage), Pro ($29/month), Business ($99/month), and Enterprise (custom pricing). Each plan includes different API call limits and features.";
    }

    if (
      lowerMessage.includes("feature") ||
      lowerMessage.includes("what can you do")
    ) {
      return "ThinkFlowGPT offers AI-powered content generation, workflow automation, API access, custom model fine-tuning, and integration with popular tools and platforms.";
    }

    if (
      lowerMessage.includes("account") ||
      lowerMessage.includes("sign up") ||
      lowerMessage.includes("register")
    ) {
      return "You can create an account by clicking the 'Sign Up' tab on our authentication page. It only takes a minute to get started!";
    }

    if (lowerMessage.includes("api") || lowerMessage.includes("integration")) {
      return "ThinkFlowGPT provides a robust API for integrating AI capabilities into your applications. Check our documentation for details on endpoints, authentication, and example code.";
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
      return "For support, you can visit our help center, check the documentation, or contact our support team at support@thinkflowgpt.com.";
    }

    // Default response
    return "I'm here to help with any questions about ThinkFlowGPT. You can ask about our features, pricing, or how to get started.";
  };

  return (
    <div className="relative z-50">
      <motion.div
        className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(149,76,233,0.5)]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isOpen ? (
          <X className="text-white h-6 w-6" />
        ) : (
          <MessageCircle className="text-white h-6 w-6" />
        )}
        <motion.div
          className="absolute inset-0 rounded-full bg-purple-500/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <AnimatePresence>
        {isHovered && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-black/80 text-white text-sm py-1 px-3 rounded-md"
          >
            AI Assistant
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-full right-0 mb-4 w-80 sm:w-96 bg-black/80 backdrop-blur-md border border-purple-500/30 rounded-lg shadow-lg overflow-hidden"
          >
            {/* Chat header */}
            <div className="flex items-start p-4 border-b border-purple-500/20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-xs font-bold">AI</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-purple-300">
                  ThinkFlow Assistant
                </p>
                <p className="text-xs text-gray-300">
                  How can I help you today?
                </p>
              </div>
            </div>

            {/* Chat messages */}
            <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.sender === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-800 text-gray-100"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-gray-100 rounded-lg px-3 py-2">
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div className="px-4 py-2 border-t border-purple-500/20">
              <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {quickQuestions.map((question) => (
                  <button
                    key={question.id}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs bg-purple-900/50 hover:bg-purple-800/50 text-white px-2 py-1 rounded-full border border-purple-500/30 transition-colors"
                  >
                    {question.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Input area */}
            <div className="p-3 border-t border-purple-500/20 flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                placeholder="Type your message..."
                className="bg-gray-900 border-purple-500/30 text-white"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
