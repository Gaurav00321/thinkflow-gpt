import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MessageSquare, Plus, Trash } from "lucide-react";
import { useChatStore } from "@/hooks/use-chat-store";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ChatSidebar() {
  const router = useRouter();
  const { chats, removeChat, clearChats } = useChatStore();
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  return (
    <div className="flex h-full w-80 flex-col gap-2 border-r bg-muted/10 p-4">
      <Button
        onClick={() => router.push("/chat")}
        className="flex items-center justify-start gap-2"
      >
        <Plus className="h-4 w-4" />
        New Chat
      </Button>

      <ScrollArea className="flex-1">
        <div className="space-y-2 pr-4">
          {chats
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .map((chat) => (
              <div
                key={chat.id}
                className="relative group"
                onMouseEnter={() => setHoveredChatId(chat.id)}
                onMouseLeave={() => setHoveredChatId(null)}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left text-sm font-normal",
                    hoveredChatId === chat.id && "bg-accent"
                  )}
                  onClick={() => router.push(`/chat/${chat.id}`)}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <div className="flex-1 truncate">{chat.title}</div>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {formatDate(chat.createdAt)}
                  </span>
                </Button>
                {hoveredChatId === chat.id && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeChat(chat.id);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete chat</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
}
