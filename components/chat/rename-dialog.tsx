"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Chat } from "@/hooks/use-chat-store"

interface RenameDialogProps {
  chat: Chat | null
  isOpen: boolean
  onClose: () => void
  onRename: (id: string, newTitle: string) => Promise<void>
}

export function RenameDialog({ chat, isOpen, onClose, onRename }: RenameDialogProps) {
  const [title, setTitle] = useState("")
  const [isRenaming, setIsRenaming] = useState(false)

  useEffect(() => {
    if (chat) {
      setTitle(chat.title)
    }
  }, [chat])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chat || !title.trim()) return

    setIsRenaming(true)
    try {
      await onRename(chat.id, title)
      onClose()
    } catch (error) {
      console.error("Failed to rename chat", error)
    } finally {
      setIsRenaming(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-black/95 border-purple-500/20 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-white">Rename Chat</DialogTitle>
          <DialogDescription className="text-purple-300/70">
            Enter a new name for this chat.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-purple-200">Chat Name</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-black/50 border-purple-500/30 text-purple-100 placeholder:text-purple-300/30"
              placeholder="Chat title..."
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-purple-300 hover:text-white hover:bg-purple-900/20"
            >
              Cancel
            </Button>
            <Button 
                type="submit" 
                disabled={isRenaming || !title.trim()}
                className="bg-purple-600 hover:bg-purple-500"
            >
              {isRenaming ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
