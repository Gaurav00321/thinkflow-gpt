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

interface ChatInterfaceProps {
  mode: "chat" | "code";
}

export function ChatInterface({ mode }: ChatInterfaceProps) {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addChat } = useChatStore();
  const [typingIndicator, setTypingIndicator] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

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
      const systemPrompt =
        mode === "code"
          ? "You are an expert coding assistant. Provide well-structured code examples, explanations, and debugging help. Use markdown code blocks with language specification for all code."
          : "You are ThinkFlowGPT, an AI assistant. Provide helpful, accurate, and concise responses. Format your responses with markdown when appropriate.";

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({
            role,
            content,
          })),
          systemPrompt,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error: ${response.status} - ${errorText}`);
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      // Parse the response - handle both streaming and non-streaming formats
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.error("Failed to parse response as JSON:", e);
          throw new Error("Invalid response format");
        }
      }

      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: data.message || "No response received.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

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
                      "flex gap-2",
                      message.role === "user" ? "justify-end" : "justify-start",
                      message.role === "system" && "justify-center"
                    )}
                  >
                    <div
                      className={cn(
                        "flex gap-2 max-w-[75%]",
                        message.role === "user"
                          ? "flex-row-reverse"
                          : "flex-row",
                        message.role === "system" && "max-w-3xl"
                      )}
                    >
                      {message.role !== "system" && (
                        <Avatar className="h-7 w-7 shrink-0 mt-1">
                          <AvatarFallback
                            className={cn(
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            )}
                          >
                            {message.role === "user" ? (
                              <User className="h-3 w-3" />
                            ) : (
                              <Bot className="h-3 w-3" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <Card
                        className={cn(
                          "p-3 relative group",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : message.role === "system"
                            ? "bg-muted text-muted-foreground text-sm"
                            : "rounded-tl-none"
                        )}
                      >
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({
                              node,
                              inline = false,
                              className,
                              children = null,
                              ...props
                            }: {
                              node?: any;
                              inline?: boolean;
                              className?: string;
                              children?: React.ReactNode;
                            }) {
                              const match = /language-(\w+)/.exec(
                                className || ""
                              );
                              return !inline && match ? (
                                <CodeBlock
                                  language={match[1]}
                                  code={String(children).replace(/\n$/, "")}
                                />
                              ) : (
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              );
                            },
                            p: ({ children }) => (
                              <p className="mb-2 last:mb-0">{children}</p>
                            ),
                            ul: ({ children }) => (
                              <ul className="ml-4 mb-2 last:mb-0 list-disc">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="ml-4 mb-2 last:mb-0 list-decimal">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="mb-1 last:mb-0">{children}</li>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                        {message.role !== "system" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                              onClick={() =>
                                handleCopy(message.id, message.content)
                              }
                            >
                              {copiedId === message.id ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                            <div className="text-[10px] text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {format(message.timestamp, "h:mm a")}
                            </div>
                          </>
                        )}
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {typingIndicator && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex gap-2 max-w-[75%]"
                >
                  <Avatar className="h-7 w-7 mt-1">
                    <AvatarFallback className="bg-muted">
                      <Bot className="h-3 w-3" />
                    </AvatarFallback>
                  </Avatar>
                  <Card className="p-2 rounded-tl-none">
                    <div className="flex space-x-1">
                      <motion.div
                        className="h-1.5 w-1.5 rounded-full bg-primary"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                        }}
                      />
                      <motion.div
                        className="h-1.5 w-1.5 rounded-full bg-primary"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          delay: 0.2,
                        }}
                      />
                      <motion.div
                        className="h-1.5 w-1.5 rounded-full bg-primary"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          delay: 0.4,
                        }}
                      />
                    </div>
                  </Card>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t w-full">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex justify-center space-x-2 mb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearChat}
              disabled={messages.length === 0 || isLoading}
            >
              <Trash className="h-4 w-4 mr-2" />
              Clear Chat
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={regenerateResponse}
              disabled={
                messages.length < 2 ||
                isLoading ||
                messages[messages.length - 1].role === "user"
              }
            >
              <RefreshCw
                className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")}
              />
              Regenerate
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
              ref={textareaRef}
              placeholder={`Type your ${
                mode === "code" ? "code question" : "message"
              }...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[60px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (!isLoading) handleSubmit(e);
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className={cn(
                "transition-all duration-200",
                isLoading ? "bg-muted" : "bg-primary"
              )}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
