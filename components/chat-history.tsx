"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/hooks/use-chat-store";
import { MessageSquare, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function ChatHistory() {
  const { chats, removeChat, clearChats } = useChatStore();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);

  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 p-4 text-center">
        <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
        <h3 className="font-medium mb-1">No Chat History</h3>
        <p className="text-xs text-muted-foreground">
          Your conversations will appear here
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 max-h-[300px]">
          <AnimatePresence initial={false}>
            {chats.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="relative group"
                onMouseEnter={() => setHoveredChatId(chat.id)}
                onMouseLeave={() => setHoveredChatId(null)}
              >
                <div className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors group">
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
                    className="h-7 w-7 hidden group-hover:inline-flex hover:bg-destructive hover:text-destructive-foreground items-center justify-center transition-all duration-200"
                    onClick={() => removeChat(chat.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
        <div className="p-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All History
          </Button>
        </div>
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear Chat History</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all your chat history. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                clearChats();
                setIsDeleteDialogOpen(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
