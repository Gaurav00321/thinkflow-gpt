"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/hooks/use-auth"
import { useChatStore } from "@/hooks/use-chat-store"
import { MessageSquare, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function ChatHistory() {
  const { user } = useAuth()
  const { chats, removeChat, clearChats } = useChatStore()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <MessageSquare className="h-10 w-10 text-muted-foreground mb-2" />
        <h3 className="font-medium mb-1">No Saved History</h3>
        <p className="text-sm text-muted-foreground">Sign in to save your chat history</p>
      </div>
    )
  }

  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <MessageSquare className="h-10 w-10 text-muted-foreground mb-2" />
        <h3 className="font-medium mb-1">No Chat History</h3>
        <p className="text-sm text-muted-foreground">Your conversations will appear here</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent group"
              >
                <div className="flex-1 truncate">
                  <div className="font-medium truncate">{chat.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(chat.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100"
                  onClick={() => removeChat(chat.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-2">
          <Button variant="outline" size="sm" className="w-full" onClick={() => setIsDeleteDialogOpen(true)}>
            Clear All History
          </Button>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear Chat History</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all your chat history. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                clearChats()
                setIsDeleteDialogOpen(false)
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

