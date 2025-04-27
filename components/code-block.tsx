"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { Copy, Check, Download } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language: string;
  fileName?: string;
  showLineNumbers?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  fileName,
  showLineNumbers = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  }, [code]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "code." + language;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [code, fileName, language]);

  return (
    <div className="relative my-4 rounded-md overflow-hidden border border-purple-600/30 shadow-sm">
      <div className="flex items-center justify-between px-2 sm:px-4 py-1.5 sm:py-2 bg-black/60 border-b border-purple-600/30">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex space-x-0.5 sm:space-x-1">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs sm:text-sm font-medium ml-1 sm:ml-2 text-purple-300">
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
                  className="h-6 w-6 sm:h-8 sm:w-8 hover:bg-purple-900/20"
                  onClick={handleDownload}
                >
                  <Download className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-black border border-purple-600/30 text-purple-300">
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
                  className="h-6 w-6 sm:h-8 sm:w-8 hover:bg-purple-900/20"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                  ) : (
                    <Copy className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-black border border-purple-600/30 text-purple-300">
                <p>{copied ? "Copied!" : "Copy code"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div
        className={cn("relative", "font-mono text-xs sm:text-sm", "bg-black")}
      >
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
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
};

export default CodeBlock;
