"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { ChatInterface } from "@/components/chat-interface"
import { ChatHistory } from "@/components/chat-history"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PanelLeftOpen, PanelLeftClose } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function ChatPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [showSidebar, setShowSidebar] = useState(true)
  const [activeTab, setActiveTab] = useState("chat")
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    if (isMobile) {
      setShowSidebar(false)
    }
  }, [isMobile])

  useEffect(() => {
    if (!user) {
      toast({
        title: "Guest Mode",
        description: "You're using ThinkFlowGPT in guest mode. Sign in to save your chat history.",
        duration: 5000,
      })
    }
  }, [user, toast])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && (
          <div className="w-64 border-r bg-background flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Chat History</h2>
            </div>
            <ChatHistory />
          </div>
        )}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <Button variant="ghost" size="icon" onClick={() => setShowSidebar(!showSidebar)}>
              {showSidebar ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
            </Button>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="code">Code Assistant</TabsTrigger>
              </TabsList>
              <div className="w-9"></div> {/* Spacer for alignment */}
            </Tabs>
          </div>
          <div className="flex-1">
            {activeTab === "chat" && <ChatInterface mode="chat" />}
            {activeTab === "code" && <ChatInterface mode="code" />}
          </div>
        </div>
      </div>
    </div>
  )
}

