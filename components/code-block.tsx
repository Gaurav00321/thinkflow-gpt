"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Download } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CodeBlockProps {
  language: string;
  code: string;
  showLineNumbers?: boolean;
  fileName?: string;
}

export function CodeBlock({
  language,
  code,
  showLineNumbers = true,
  fileName,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName || `code-snippet.${language}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="relative my-4 rounded-md overflow-hidden border shadow-sm">
      <div className="flex items-center justify-between px-2 sm:px-4 py-1.5 sm:py-2 bg-muted border-b">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex space-x-0.5 sm:space-x-1">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs sm:text-sm font-medium ml-1 sm:ml-2">
            {fileName || language}
          </span>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                  onClick={handleDownload}
                >
                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                  ) : (
                    <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? "Copied!" : "Copy code"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div
        className={cn(
          "relative",
          "font-mono text-xs sm:text-sm",
          isDark ? "bg-zinc-950" : "bg-zinc-50"
        )}
      >
        <SyntaxHighlighter
          language={language}
          style={isDark ? vscDarkPlus : oneLight}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: "0.75rem",
            fontSize: "0.8rem",
            backgroundColor: "transparent",
            overflowX: "auto",
          }}
          wrapLines={true}
          wrapLongLines={false}
          codeTagProps={{
            className: "font-mono",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
