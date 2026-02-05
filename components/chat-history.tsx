"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Trash2, MoreHorizontal, Pin, Share2, Pencil, Plus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { getChats, deleteChat, clearChats as clearAllChats, updateChat as updateChatApi } from "@/app/actions/chat";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ShareModal } from "@/components/chat/share-modal";
import { RenameDialog } from "@/components/chat/rename-dialog";
import { useChatStore, Chat } from "@/hooks/use-chat-store";
import { v4 as uuidv4 } from "uuid";

export function ChatHistory() {
  const { chats, setChats, removeChat, pinChat, updateChat, clearChats } = useChatStore();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);
  
  // Dialog States
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  
  const [renameChat, setRenameChat] = useState<Chat | null>(null);
  const [shareChat, setShareChat] = useState<Chat | null>(null);

  const fetchChats = async () => {
    try {
      const data = await getChats();
      // Transform DB data to Store format if needed, but assuming match closely
      // Map database snake_case to camelCase for the store
      const formattedChats = (data || []).map((c: any) => ({
          ...c,
          createdAt: new Date(c.created_at),
          updatedAt: new Date(c.created_at), // Fallback if no updated_at
          isPinned: c.is_pinned,
          messages: [] // Initialize with empty messages for store safety
      }));
      setChats(formattedChats);
    } catch (error) {
      console.error("Failed to load chats", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleNewChat = () => {
    router.push("/chat");
    // Optionally focus input logic handled in chat interface via URL/mount
  };

  const handleDeleteRequest = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChatToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (chatToDelete) {
        // Optimistic Delete
        const previousChats = [...chats];
        removeChat(chatToDelete);
        setIsDeleteDialogOpen(false);

        try {
            const success = await deleteChat(chatToDelete);
            if (!success) throw new Error("Delete failed");
            toast({ title: "Chat deleted" });
        } catch (error) {
            // Revert
            setChats(previousChats);
            toast({ title: "Error deleting chat", variant: "destructive" });
        }
        setChatToDelete(null);
    } else {
        // Clear All Logic
        const previousChats = [...chats];
        clearChats();
        setIsDeleteDialogOpen(false);
        try {
            const success = await clearAllChats();
            if (!success) throw new Error("Clear failed");
            toast({ title: "History cleared" });
        } catch (error) {
            setChats(previousChats);
            toast({ title: "Error clearing history", variant: "destructive" });
        }
    }
  };

  const handlePinChat = async (chat: Chat, e: React.MouseEvent) => {
    e.stopPropagation();
    // Optimistic Update
    pinChat(chat.id);
    
    try {
      await updateChatApi(chat.id, { is_pinned: !chat.isPinned });
    } catch (error) {
      // Revert if failed - simplified revert by toggling back
      pinChat(chat.id);
      toast({ title: "Failed to update pin", variant: "destructive" });
    }
  };

  const handleRename = async (id: string, newTitle: string) => {
    // Optimistic Update
    updateChat(id, { title: newTitle });
    
    try {
        await updateChatApi(id, { title: newTitle });
        toast({ title: "Chat renamed" });
    } catch (error) {
        toast({ title: "Failed to rename chat", variant: "destructive" });
        // Could fetchChats() to revert or implement stricter revert logic
    }
  };

  if (!isLoading && chats.length === 0) {
    return (
      <div className="flex flex-col h-full">
         <div className="px-2 mb-2">
            <Button 
                onClick={handleNewChat} 
                className="w-full justify-start gap-2 bg-gradient-to-r from-purple-600/10 to-blue-600/10 hover:from-purple-600/20 hover:to-blue-600/20 border border-purple-500/20 text-purple-100 mb-2"
                variant="outline"
            >
                <Plus className="h-4 w-4" />
                New Chat
            </Button>
         </div>
         <div className="flex flex-col items-center justify-center flex-1 p-4 text-center">
            <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
            <h3 className="font-medium mb-1">No Chat History</h3>
            <p className="text-xs text-muted-foreground">
            Start a new conversation
            </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="px-2 mb-2">
            <Button 
                onClick={handleNewChat} 
                className="w-full justify-start gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 border border-purple-500/30 text-white mb-2 shadow-sm transition-all"
                variant="outline"
            >
                <Plus className="h-4 w-4" />
                New Chat
            </Button>
        </div>
        
        <ScrollArea className="flex-1 -mx-2 px-2">
          <div className="space-y-0.5 pb-2">
          <AnimatePresence initial={false} mode="popLayout">
            {chats.map((chat) => (
              <motion.div
                layout
                key={chat.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="relative group rounded-md overflow-hidden"
                onMouseEnter={() => setHoveredChatId(chat.id)}
                onMouseLeave={() => setHoveredChatId(null)}
              >
                <div 
                  className={`flex items-center justify-between px-3 py-2.5 text-sm transition-colors cursor-pointer rounded-md mx-1 ${
                    chat.isPinned ? "bg-purple-900/20 border border-purple-500/10" : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                  }`}
                  onClick={() => router.push(`/chat?id=${chat.id}`)}
                >
                  <div className="flex-1 truncate mr-2 min-w-0">
                    <div className="flex items-center gap-2 font-medium truncate text-sm">
                        {chat.isPinned && <Pin className="h-3 w-3 text-purple-400 shrink-0 rotate-45" />}
                        <span className="truncate text-foreground/90">{chat.title || "New Chat"}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5 truncate">
                      {chat.updatedAt ? formatDistanceToNow(new Date(chat.updatedAt), { addSuffix: true }) : 'Just now'}
                    </div>
                  </div>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-background/20 rounded-full">
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        align="start" 
                        sideOffset={-8}
                        className="w-48 bg-black/95 backdrop-blur-xl border border-purple-500/20 shadow-xl overflow-hidden rounded-xl z-50"
                      >
                        <DropdownMenuItem onClick={(e) => handlePinChat(chat, e)} className="cursor-pointer focus:bg-purple-500/20">
                            <Pin className="mr-2 h-4 w-4" />
                            {chat.isPinned ? "Unpin Chat" : "Pin Chat"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setShareChat(chat)} className="cursor-pointer focus:bg-purple-500/20">
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setRenameChat(chat)} className="cursor-pointer focus:bg-purple-500/20">
                            <Pencil className="mr-2 h-4 w-4" />
                            Rename
                        </DropdownMenuItem>
                         <DropdownMenuSeparator className="bg-purple-500/20" />
                        <DropdownMenuItem 
                            onClick={(e) => handleDeleteRequest(chat.id, e)} 
                            className="text-red-400 focus:text-red-400 focus:bg-red-900/20 cursor-pointer"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          </div>
        </ScrollArea>
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="bg-black/95 border-purple-500/20 backdrop-blur-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete {chatToDelete ? "this chat" : "all chat history"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-purple-500/20 hover:bg-purple-500/10 hover:text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white border-0"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {shareChat && (
          <ShareModal 
            isOpen={!!shareChat} 
            onClose={() => setShareChat(null)} 
            chat={shareChat} 
          />
      )}
      
      {renameChat && (
          <RenameDialog 
            isOpen={!!renameChat} 
            onClose={() => setRenameChat(null)} 
            chat={renameChat}
            onRename={handleRename}
          />
      )}
    </>
  );
}
