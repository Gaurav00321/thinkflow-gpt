"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Mail, MessageCircle, Check } from "lucide-react"
import { Chat } from "@/hooks/use-chat-store"

interface ShareModalProps {
  chat: Chat | null
  isOpen: boolean
  onClose: () => void
}

export function ShareModal({ chat, isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  if (!chat) return null

  const shareUrl = `${window.location.origin}/chat/${chat.id}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEmailShare = () => {
    window.open(`mailto:?subject=Check out this chat on ThinkFlowGPT&body=Here's a link to my chat: ${shareUrl}`)
  }

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=Check out this chat on ThinkFlowGPT: ${shareUrl}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-black/95 border-purple-500/20 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-white">Share Chat</DialogTitle>
          <DialogDescription className="text-purple-300/70">
            Share this chat via link, email, or messaging apps.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="flex-1 flex gap-2 border-purple-500/20 hover:bg-purple-900/20 text-purple-100"
              onClick={handleEmailShare}
            >
              <Mail className="h-4 w-4" /> Email
            </Button>
            <Button
              variant="outline"
              className="flex-1 flex gap-2 border-purple-500/20 hover:bg-green-900/20 text-green-100 hover:text-green-200"
              onClick={handleWhatsAppShare}
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="link" className="text-purple-200">Chat Link</Label>
            <div className="flex items-center gap-2">
              <Input
                id="link"
                value={shareUrl}
                readOnly
                className="bg-black/50 border-purple-500/30 text-purple-100"
              />
              <Button
                size="icon"
                onClick={handleCopy}
                className={copied ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
