"use client";

import { useState, useEffect } from "react";
import { ChatInterface } from "@/components/chat-interface";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Code, Settings, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ChatHistory } from "@/components/chat-history";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatPage() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("chat");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Show welcome toast
    toast({
      title: "Welcome to ThinkFlowGPT",
      description:
        "Ask me anything or switch to Code Assistant for programming help.",
      duration: 5000,
    });
  }, [toast]);

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex h-screen w-screen overflow-hidden bg-background">
        <Sidebar variant="floating" collapsible="offcanvas" className="z-50">
          <SidebarHeader className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <h2 className="text-lg font-bold">ThinkFlowGPT</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "chat"}
                  onClick={() => setActiveTab("chat")}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "code"}
                  onClick={() => setActiveTab("code")}
                >
                  <Code className="h-5 w-5" />
                  <span>Code Assistant</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarSeparator />
            <div className="px-3 py-2">
              <h3 className="text-sm font-medium mb-2">Chat History</h3>
              <ChatHistory />
            </div>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-5 w-5" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-5 w-5" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <User className="h-5 w-5" />
                  <span>Account</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col overflow-hidden w-full">
          <div className="border-b p-4 flex items-center justify-between w-full">
            <div className="flex items-center">
              <SidebarTrigger className="mr-2" />
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-[300px]"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="code">Code Assistant</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="flex-1 overflow-hidden w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "chat" && <ChatInterface mode="chat" />}
              {activeTab === "code" && <ChatInterface mode="code" />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </SidebarProvider>
  );
}
