import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthModalProvider } from "@/components/auth/auth-modal-provider";
import { AuthProvider } from "@/hooks/use-auth";
import "./globals.css";

import '@/styles/prism-theme.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ThinkFlowGPT - AI-Powered Workflow Automation Assistant",
  description:
    "ThinkFlowGPT, founded by Gaurav Upadhyay, is an AI-driven platform that streamlines workflows for businesses and students. Simplify tasks, boost productivity, and automate with intelligence.",
  metadataBase: new URL("https://thinkflowgpt.vercel.app"),
  keywords: [
    "ThinkFlowGPT",
    "AI workflow automation",
    "AI productivity assistant",
    "workflow automation SaaS",
    "AI for students",
    "AI for startups",
    "automate business tasks",
    "student productivity tools",
    "Gaurav Upadhyay AI",
    "AI task assistant",
    "ThinkFlow automation",
    "GPT automation",
    "AI-powered SaaS platform",
  ],
  category: "technology",
  authors: [
    {
      name: "Gaurav Upadhyay",
      url: "https://gauravupadhyay.vercel.app",
    },
  ],
  creator: "Gaurav Upadhyay",
  publisher: "ThinkFlowGPT",
  openGraph: {
    title: "ThinkFlowGPT - Automate Your Work with AI",
    description:
      "Discover ThinkFlowGPT by Gaurav Upadhyay – an AI automation platform built to streamline tasks and increase efficiency for businesses and students.",
    url: "https://thinkflowgpt.vercel.app",
    siteName: "ThinkFlowGPT",
    type: "website",
    images: [
      {
        url: "https://thinkflowgpt.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "ThinkFlowGPT - AI Workflow Automation",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ThinkFlowGPT - AI Workflow Assistant by Gaurav Upadhyay",
    description:
      "Simplify business and academic tasks using ThinkFlowGPT. An AI-powered automation assistant built by Gaurav Upadhyay to boost your productivity.",
    site: "@ThinkFlowGPT", // Replace if you have a valid handle
    creator: "@gauravXupadhyay", // Replace if you have a valid handle
    images: ["https://thinkflowgpt.vercel.app/og-image.png"],
  },
  verification: {
    google: "uL1VxfRJlaPS7zOBj-dskIjBcmwnv_a6zLqwTFRPWWM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthModalProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </AuthModalProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
