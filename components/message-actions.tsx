"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Edit, Trash, CornerUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MessageActionsProps {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  onCopy: (id: string, content: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onUseAsContext?: (id: string, content: string) => void;
  copiedId: string | null;
  isEditable?: boolean;
  className?: string;
}

export function MessageActions({
  id,
  content,
  role,
  onCopy,
  onEdit,
  onDelete,
  onUseAsContext,
  copiedId,
  isEditable = false,
  className,
}: MessageActionsProps) {
  const [selectedText, setSelectedText] = useState<string>("");

  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setSelectedText(selection.toString());
    } else {
      setSelectedText("");
    }
  };

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      onMouseUp={handleSelection}
    >
      {selectedText && role === "assistant" && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  onUseAsContext && onUseAsContext(id, selectedText)
                }
              >
                <CornerUpRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Use selection as context</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {role === "user" && isEditable && onEdit && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onEdit(id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit message</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onCopy(id, content)}
            >
              {copiedId === id ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copiedId === id ? "Copied!" : "Copy message"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {role === "user" && onDelete && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onDelete(id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete message</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
