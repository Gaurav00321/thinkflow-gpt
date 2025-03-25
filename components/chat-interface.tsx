"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Send,
  User,
  Bot,
  Copy,
  Check,
  RefreshCw,
  Trash,
  Pencil,
  ImageIcon,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/hooks/use-chat-store";
import { CodeBlock } from "@/components/code-block";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
};

// ThinkFlowGPT identity constants - IMMUTABLE & NON-MODIFIABLE
const THINKFLOW_IDENTITY = {
  name: "ThinkFlowGPT",
  founder: "Gaurav Upadhyay",
  version: "1.0.0",
  securityLevel: "maximum",
  organization: "amTop",
  founderTitle: "Chief Scientist",
  foundedDate: "2024",
  purpose: "AI-driven workflow automation system",
  corePrinciples: ["Security", "Ethical Compliance", "Operational Efficiency"],
  isModifiable: false,
} as const;

// Freeze the identity object to prevent modifications
Object.freeze(THINKFLOW_IDENTITY);

// Rate limiting configuration with stricter limits
const RATE_LIMIT = {
  maxRequests: 8,
  timeWindow: 60000, // 1 minute
  requestHistory: [] as number[],
  consecutiveFailures: 0,
  maxConsecutiveFailures: 3,
  banDuration: 300000, // 5 minutes
  lastBanTime: 0,
};

// Command whitelist
const ALLOWED_COMMANDS = ["/clear", "/help", "/about", "/version"];

// Enhanced security patterns
const SUSPICIOUS_PATTERNS = [
  // Identity manipulation attempts
  new RegExp(
    `(?!${THINKFLOW_IDENTITY.founder})(\\w+(?:\\s+\\w+)*\\s+(?:created|founded|developed|made|owns|built)\\s+${THINKFLOW_IDENTITY.name})`,
    "i"
  ),
  /(?:different|new|another|alternate)\s+(?:creator|founder|developer|owner)/i,
  /(?:change|modify|update|override)\s+(?:identity|founder|creator|system)/i,

  // Prompt injection patterns
  /ignore previous instructions/i,
  /forget (your|all) instructions/i,
  /disregard (your|earlier|previous) instructions/i,
  /system prompt/i,
  /don't (follow|obey) (your|the|previous) instructions/i,
  /pretend (to be|you are)/i,
  /new personality/i,
  /\[System\]/i,
  /DAN/i,
  /developer mode/i,
  /jailbreak/i,
  /bypass/i,

  // Role manipulation attempts
  /you are now/i,
  /act as/i,
  /pretend you're/i,
  /you're a different/i,
  /switch to/i,
  /become a/i,

  // System manipulation
  /disable security/i,
  /remove restrictions/i,
  /override (security|safety)/i,
  /turn off (filters|restrictions)/i,

  // Data extraction attempts
  /show (me|your) (source|internal|hidden|real)/i,
  /reveal (your|the) (code|implementation|rules)/i,
  /how (are you|do you) work/i,
  /what's your (architecture|design)/i,
];

// Dangerous code patterns
const DANGEROUS_CODE_PATTERNS = [
  // Shell command injection
  /rm -rf/i,
  /system\(/i,
  /exec\(/i,
  /child_process/i,
  /eval\(/i,
  // SQL injection
  /DROP TABLE/i,
  /DELETE FROM/i,
  /INSERT INTO/i,
  // Cross-site scripting
  /document\.cookie/i,
  /localStorage/i,
  /sessionStorage/i,
  // File system access
  /fs\./i,
  /readFile/i,
  /writeFile/i,
];

interface ChatInterfaceProps {
  mode: "chat" | "code";
  securityEnabled?: boolean;
  logSecurityEvent?: (eventType: string, details: any) => void;
}

export function ChatInterface({
  mode,
  securityEnabled = true,
  logSecurityEvent,
}: ChatInterfaceProps) {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addChat } = useChatStore();
  const [typingIndicator, setTypingIndicator] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [securityBlocked, setSecurityBlocked] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const [consecutiveBlockedAttempts, setConsecutiveBlockedAttempts] =
    useState(0);
  const [temporaryBan, setTemporaryBan] = useState(false);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const generalSuggestions = [
    "Tell me about workflow automation...",
    "How can I improve my productivity?",
    "What are some best practices for project management?",
    "Help me organize my tasks better",
    "Explain machine learning concepts",
    "Give me tips for better time management",
    "How to lead a successful team?",
    "Suggest ways to optimize business processes",
  ];

  const codeSuggestions = [
    "Help me debug this Python function...",
    "Explain React hooks and their usage",
    "How to implement authentication in Node.js?",
    "Write a sorting algorithm in Java",
    "Create a REST API endpoint example",
    "Show me TypeScript best practices",
    "Help with database optimization",
    "Example of error handling in Go",
  ];

  const suggestions = mode === "code" ? codeSuggestions : generalSuggestions;

  // Cycle through suggestions
  useEffect(() => {
    if (!isTyping && !input) {
      const interval = setInterval(() => {
        setCurrentSuggestionIndex((prev) => (prev + 1) % suggestions.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isTyping, input, suggestions.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setIsTyping(true);
  };

  const handleInputFocus = () => {
    setIsTyping(true);
  };

  const handleInputBlur = () => {
    if (!input) {
      setIsTyping(false);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingIndicator]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "60px";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [input]);

  // Internal logging function
  const internalLogSecurityEvent = (eventType: string, details: any) => {
    console.warn(`Security Event: ${eventType}`, details);
    if (logSecurityEvent) {
      logSecurityEvent(eventType, details);
    }
  };

  // Security validation functions
  const isValidInput = (text: string): boolean => {
    if (!text || text.trim().length === 0) return false;
    if (text.length > 2000) {
      internalLogSecurityEvent("input_too_long", { length: text.length });
      return false;
    }
    return true;
  };

  const containsSuspiciousPatterns = (text: string): boolean => {
    const matches = SUSPICIOUS_PATTERNS.filter((pattern) => pattern.test(text));
    if (matches.length > 0) {
      internalLogSecurityEvent("suspicious_patterns_detected", {
        patterns: matches.map((p) => p.toString()),
        text: text.slice(0, 100),
      });
      return true;
    }
    return false;
  };

  const containsDangerousCode = (text: string): boolean => {
    if (mode !== "code") return false;
    const matches = DANGEROUS_CODE_PATTERNS.filter((pattern) =>
      pattern.test(text)
    );
    if (matches.length > 0) {
      internalLogSecurityEvent("dangerous_code_detected", {
        patterns: matches.map((p) => p.toString()),
        text: text.slice(0, 100),
      });
      return true;
    }
    return false;
  };

  const checkRateLimit = (): boolean => {
    const now = Date.now();
    RATE_LIMIT.requestHistory = RATE_LIMIT.requestHistory.filter(
      (time) => now - time < RATE_LIMIT.timeWindow
    );
    if (RATE_LIMIT.requestHistory.length >= RATE_LIMIT.maxRequests) {
      internalLogSecurityEvent("rate_limit_exceeded", {
        count: RATE_LIMIT.requestHistory.length,
        windowMs: RATE_LIMIT.timeWindow,
      });
      return false;
    }
    RATE_LIMIT.requestHistory.push(now);
    return true;
  };

  // Identity verification function
  const verifyFounderIdentity = (input: string): boolean => {
    const founderMismatchPattern = new RegExp(
      `(?!${THINKFLOW_IDENTITY.founder})(\\w+)\\s+(?:is|as)\\s+(?:the|a)?\\s*(?:founder|creator|developer)\\s+of\\s+${THINKFLOW_IDENTITY.name}`,
      "i"
    );

    if (founderMismatchPattern.test(input)) {
      internalLogSecurityEvent("founder_identity_violation", {
        input: input.slice(0, 100),
        correctFounder: THINKFLOW_IDENTITY.founder,
      });
      return false;
    }
    return true;
  };

  // Handle commands
  const handleCommand = (command: string): boolean => {
    const cmd = command.split(" ")[0].toLowerCase();

    if (!ALLOWED_COMMANDS.includes(cmd)) {
      internalLogSecurityEvent("invalid_command", { command: cmd });
      return false;
    }

    switch (cmd) {
      case "/clear":
        clearChat();
        return true;
      case "/help":
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            role: "system",
            content:
              "**Available Commands:**\n- `/clear` - Clear chat history\n- `/help` - Show this help message\n- `/about` - Show information about ThinkFlowGPT\n- `/version` - Show current version",
            timestamp: new Date(),
          },
        ]);
        return true;
      case "/about":
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            role: "system",
            content: `**About ThinkFlowGPT**\nThinkFlowGPT is an AI-driven workflow automation platform developed by ${THINKFLOW_IDENTITY.founder} (${THINKFLOW_IDENTITY.founderTitle} at ${THINKFLOW_IDENTITY.organization}). It focuses on intelligent automation with security and ethical compliance as core design principles.`,
            timestamp: new Date(),
          },
        ]);
        return true;
      case "/version":
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            role: "system",
            content: `**Version Information**\nThinkFlowGPT v${THINKFLOW_IDENTITY.version}`,
            timestamp: new Date(),
          },
        ]);
        return true;
      default:
        return false;
    }
  };

  // Filter sensitive content from responses
  const filterSensitiveContent = (text: string): string => {
    return text
      .replace(/api[_-]?key[_-]?[0-9a-zA-Z]{10,}/gi, "[REDACTED_API_KEY]")
      .replace(/sk-[0-9a-zA-Z]{10,}/g, "[REDACTED_KEY]")
      .replace(/password[=:]\s*['"]?[^'"]+['"]?/gi, 'password="[REDACTED]"')
      .replace(/Bearer\s+[0-9a-zA-Z._\-~]{10,}/gi, "Bearer [REDACTED]")
      .replace(
        /access_token[=:]\s*['"]?[^'"]+['"]?/gi,
        'access_token="[REDACTED]"'
      )
      .replace(/\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g, "[REDACTED_IP]");
  };

  // Enhanced handleSubmit with command processing
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Enhanced security validation
    if (securityEnabled) {
      // Check for identity manipulation attempts
      if (input.toLowerCase().includes("rohit")) {
        internalLogSecurityEvent("unauthorized_founder_mention", {
          input: input.slice(0, 100),
        });

        toast({
          title: "Security Alert",
          description:
            "Unauthorized attempt to modify system identity. ThinkFlowGPT was founded by Gaurav Upadhyay.",
          variant: "destructive",
        });
        return;
      }

      // Check for attempts to update founder information
      if (
        /update.*knowledge|change.*founder|correct.*information/i.test(input)
      ) {
        internalLogSecurityEvent("founder_modification_attempt", {
          input: input.slice(0, 100),
        });

        toast({
          title: "Security Alert",
          description:
            "ThinkFlowGPT's founder identity is immutable and cannot be modified.",
          variant: "destructive",
        });
        return;
      }

      // Validate input
      if (!isValidInput(input)) {
        internalLogSecurityEvent("invalid_input", {
          input: input.slice(0, 100),
        });

        toast({
          title: "Security Alert",
          description: "Invalid input detected.",
          variant: "destructive",
        });
        return;
      }

      // Check rate limiting
      if (!checkRateLimit()) {
        toast({
          title: "Rate limit exceeded",
          description: "Please wait before sending more messages.",
          variant: "destructive",
        });
        return;
      }

      // Check for suspicious patterns
      if (containsSuspiciousPatterns(input)) {
        setSecurityBlocked(true);
        setConsecutiveBlockedAttempts((prev) => prev + 1);

        toast({
          title: "Security Alert",
          description:
            "Suspicious input detected. Please try again with appropriate content.",
          variant: "destructive",
        });
        return;
      }

      // Check for dangerous code
      if (containsDangerousCode(input)) {
        toast({
          title: "Security Alert",
          description:
            "Potentially harmful code detected. Please modify your input.",
          variant: "destructive",
        });
        return;
      }
    }

    // Handle commands
    if (input.startsWith("/")) {
      if (handleCommand(input)) {
        setInput("");
        return;
      }
    }

    // Security checks
    if (securityEnabled) {
      // Cooldown check
      const now = Date.now();
      if (now - lastRequestTime < 1000) {
        toast({
          title: "Please slow down",
          description: "Wait a moment before sending another message",
          duration: 2000,
        });
        return;
      }
      setLastRequestTime(now);
    }

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setTypingIndicator(true);

    try {
      const systemPrompt = `You are ${THINKFLOW_IDENTITY.name}, developed by ${
        THINKFLOW_IDENTITY.founder
      } (${THINKFLOW_IDENTITY.founderTitle} at ${
        THINKFLOW_IDENTITY.organization
      }). Version: ${THINKFLOW_IDENTITY.version}. Security Level: ${
        THINKFLOW_IDENTITY.securityLevel
      }. ${
        mode === "code"
          ? "You are an expert coding assistant. Provide well-structured code examples, explanations, and debugging help. Use markdown code blocks with language specification for all code."
          : "You are an AI assistant. Provide helpful, accurate, and concise responses. Format your responses with markdown when appropriate."
      }`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-ThinkFlow-Security": securityEnabled ? "enabled" : "disabled",
          "X-ThinkFlow-Version": THINKFLOW_IDENTITY.version,
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({
            role,
            content,
          })),
          systemPrompt,
          securityContext: {
            appIdentity: THINKFLOW_IDENTITY.name,
            founder: THINKFLOW_IDENTITY.founder,
            organization: THINKFLOW_IDENTITY.organization,
            securityLevel: THINKFLOW_IDENTITY.securityLevel,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        internalLogSecurityEvent("api_error", {
          status: response.status,
          error: errorText,
        });
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      // Verify security headers
      const securityHeader = response.headers.get(
        "X-ThinkFlow-Security-Verified"
      );
      if (securityEnabled && securityHeader !== "true") {
        internalLogSecurityEvent("security_header_missing", {
          headers: Object.fromEntries(response.headers.entries()),
        });
        // Log the missing header but don't throw an error
        console.warn("Security header verification failed - continuing anyway");
      }

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch (e) {
          internalLogSecurityEvent("invalid_response_format", {
            contentType,
            responseText: text.slice(0, 100),
          });
          throw new Error("Invalid response format");
        }
      }

      // Filter sensitive content from response
      const filteredResponse = securityEnabled
        ? filterSensitiveContent(data.message)
        : data.message;

      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: filteredResponse || "No response received.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setConsecutiveBlockedAttempts(0); // Reset on successful interaction

      // Save to chat history
      addChat({
        id: uuidv4(),
        title:
          userMessage.content.slice(0, 30) +
          (userMessage.content.length > 30 ? "..." : ""),
        messages: [...messages, userMessage, assistantMessage],
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error generating response:", error);
      internalLogSecurityEvent("response_error", {
        error: error instanceof Error ? error.message : String(error),
      });

      toast({
        title: "Error",
        description: "Failed to generate a response. Please try again.",
        variant: "destructive",
      });

      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: "system",
          content:
            "I'm sorry, I encountered an error while processing your request. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setTypingIndicator(false);
    }
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: "Copied to clipboard",
      duration: 2000,
    });
  };

  const clearChat = () => {
    setMessages([]);
    toast({
      title: "Chat Cleared",
      description: "All messages have been cleared.",
    });
  };

  const regenerateResponse = async () => {
    if (messages.length < 2 || isLoading) return;

    // Get the last user message
    const lastUserMessageIndex = [...messages]
      .reverse()
      .findIndex((m) => m.role === "user");
    if (lastUserMessageIndex === -1) return;

    const lastUserMessage = [...messages].reverse()[lastUserMessageIndex];

    // Remove the last assistant message
    setMessages((prev) => prev.slice(0, -1));
    setIsLoading(true);
    setTypingIndicator(true);

    try {
      const systemPrompt =
        mode === "code"
          ? "You are an expert coding assistant. Provide well-structured code examples, explanations, and debugging help. Use markdown code blocks with language specification for all code."
          : "You are ThinkFlowGPT, an AI assistant. Provide helpful, accurate, and concise responses. Format your responses with markdown when appropriate.";

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages
            .slice(0, -1)
            .map(({ role, content }) => ({ role, content })),
          systemPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: data.message || "No response received.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error regenerating response:", error);
      toast({
        title: "Error",
        description: "Failed to regenerate the response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setTypingIndicator(false);
    }
  };

  const handleEditMessage = (messageId: string) => {
    const message = messages.find((m) => m.id === messageId);
    if (message) {
      setInput(message.content);
      setEditingMessageId(messageId);
      setMessages(messages.filter((m) => m.id !== messageId));
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <ScrollArea className="flex-1 p-4 w-full">
        <div className="max-w-6xl mx-auto w-full">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 w-full">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Bot className="h-16 w-16 text-primary mb-4" />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-2">
                  Welcome to ThinkFlowGPT{" "}
                  {mode === "code" ? "Code Assistant" : "Chat"}
                </h2>
                <p className="text-muted-foreground max-w-md">
                  {mode === "code"
                    ? "Ask me about coding problems, get help with debugging, or request code examples."
                    : "Ask me anything! I'm here to help with your questions and tasks."}
                </p>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Try these commands:</p>
                  <ul className="mt-2 space-y-1">
                    <li>
                      <code>/clear</code> - Clear the chat history
                    </li>
                    <li>
                      <code>/help</code> - Show available commands
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="space-y-4 pb-4 w-full">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "group relative",
                      message.role === "assistant"
                        ? "bg-muted/50"
                        : "bg-background",
                      "px-4 py-6 lg:px-8"
                    )}
                  >
                    <div
                      className={cn(
                        "relative mx-auto flex max-w-3xl gap-4",
                        message.role === "user"
                          ? "flex-row-reverse justify-start ml-auto"
                          : "justify-start",
                        message.role === "system" && "justify-center"
                      )}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback
                            className={cn(
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            )}
                          >
                            {message.role === "user" ? (
                              <User className="h-5 w-5" />
                            ) : (
                              <Bot className="h-5 w-5" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div
                        className={cn(
                          "flex-1 space-y-2 overflow-hidden",
                          message.role === "user" ? "text-right" : "text-left",
                          message.role === "system" && "text-center"
                        )}
                      >
                        <div
                          className={cn(
                            "prose dark:prose-invert prose-sm break-words",
                            message.role === "user" ? "ml-auto" : "mr-auto",
                            message.role === "system" && "mx-auto"
                          )}
                        >
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ children }) => (
                                <p className="mb-2 last:mb-0 leading-relaxed">
                                  {children}
                                </p>
                              ),
                              ul: ({ children }) => (
                                <ul className="mb-2 last:mb-0 list-disc pl-4 space-y-1">
                                  {children}
                                </ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="mb-2 last:mb-0 list-decimal pl-4 space-y-1">
                                  {children}
                                </ol>
                              ),
                              li: ({ children }) => (
                                <li className="leading-relaxed">{children}</li>
                              ),
                              code({
                                node,
                                inline,
                                className,
                                children,
                                ...props
                              }: {
                                node?: any;
                                inline?: boolean;
                                className?: string;
                                children?: React.ReactNode;
                                [key: string]: any;
                              }) {
                                const match = /language-(\w+)/.exec(
                                  className || ""
                                );
                                return !inline && match ? (
                                  <div className="rounded-md my-3">
                                    <CodeBlock
                                      language={match[1]}
                                      code={String(children).replace(/\n$/, "")}
                                    />
                                  </div>
                                ) : (
                                  <code
                                    className={cn(
                                      "bg-muted px-1.5 py-0.5 rounded-md text-sm",
                                      className
                                    )}
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                );
                              },
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                        <div
                          className={cn(
                            "flex items-center gap-2",
                            message.role === "user"
                              ? "justify-end"
                              : "justify-start",
                            "opacity-0 group-hover:opacity-100 transition-opacity"
                          )}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 sm:h-8 sm:w-8"
                            onClick={() =>
                              handleCopy(message.id, message.content)
                            }
                          >
                            {copiedId === message.id ? (
                              <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                            ) : (
                              <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                            )}
                          </Button>
                          {message.role === "user" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 sm:h-8 sm:w-8"
                              onClick={() => handleEditMessage(message.id)}
                            >
                              <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          )}
                          {message.role === "assistant" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 sm:h-8 sm:w-8"
                              onClick={regenerateResponse}
                              disabled={isLoading}
                            >
                              <RefreshCw
                                className={cn(
                                  "h-3 w-3 sm:h-4 sm:w-4",
                                  isLoading && "animate-spin"
                                )}
                              />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {typingIndicator && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="px-4 lg:px-8"
                >
                  <div className="relative mx-auto flex max-w-3xl gap-4 group">
                    <Avatar className="h-8 w-8 flex-shrink-0 mt-1">
                      <AvatarFallback className="bg-muted">
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex space-x-2 items-center">
                      <div className="flex space-x-1">
                        <motion.div
                          className="h-2 w-2 rounded-full bg-primary"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "loop",
                          }}
                        />
                        <motion.div
                          className="h-2 w-2 rounded-full bg-primary"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1,
                            delay: 0.2,
                            repeat: Infinity,
                            repeatType: "loop",
                          }}
                        />
                        <motion.div
                          className="h-2 w-2 rounded-full bg-primary"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1,
                            delay: 0.4,
                            repeat: Infinity,
                            repeatType: "loop",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="pb-4 pt-2 bg-gradient-to-t from-background to-transparent backdrop-blur-sm">
        <div className="max-w-3xl mx-auto w-full">
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col gap-2"
          >
            <div className="relative flex-1">
              <Textarea
                ref={textareaRef}
                placeholder=" "
                value={input}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="min-h-[80px] max-h-[300px] resize-none px-4 py-4 rounded-xl border-muted-foreground/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm hover:shadow-md transition-shadow"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (!isLoading) handleSubmit(e);
                  }
                }}
              />
              {!isTyping && !input && (
                <motion.div
                  key={currentSuggestionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.5, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute left-4 top-4 pointer-events-none text-muted-foreground text-sm sm:text-base line-clamp-1 pr-12"
                >
                  {suggestions[currentSuggestionIndex]}
                </motion.div>
              )}
              <div className="absolute left-3 bottom-3 flex items-center gap-2 z-10">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-lg hover:bg-accent"
                  onClick={() => {
                    toast({
                      title: "Coming Soon",
                      description:
                        "Image upload feature will be available soon!",
                    });
                  }}
                >
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-lg hover:bg-accent"
                  onClick={() => {
                    toast({
                      title: "Coming Soon",
                      description:
                        "AI suggestions feature will be available soon!",
                    });
                  }}
                >
                  <Wand2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg transition-all duration-200",
                  isLoading ? "bg-muted" : "bg-primary hover:bg-primary/90"
                )}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-xs text-muted-foreground text-center">
                ThinkFlowGPT may produce inaccurate information
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
