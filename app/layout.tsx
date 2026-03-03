import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthModalProvider } from "@/components/auth/auth-modal-provider";
import { AuthProvider } from "@/hooks/use-auth";
import "./globals.css";

import '@/styles/prism-theme.css';

import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | ThinkFlowGPT - AI Workflow Automation Platform",
    default: "ThinkFlowGPT - AI Workflow Automation Assistant",
  },
  description:
    "ThinkFlowGPT, founded by Gaurav Upadhyay, is an intelligent AI workflow automation platform that streamlines operations for businesses and students. Automate tasks with agentic intelligence.",
  metadataBase: new URL("https://thinkflowgpt.vercel.app"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "ThinkFlowGPT",
    "AI workflow automation",
    "AI productivity assistant",
    "workflow automation SaaS",
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
        <Script
          id="global-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://thinkflowgpt.vercel.app/#organization",
                  name: "ThinkFlowGPT",
                  url: "https://thinkflowgpt.vercel.app",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://thinkflowgpt.vercel.app/og-image.png",
                  },
                  sameAs: [
                    "https://twitter.com/ThinkFlowGPT",
                    "https://github.com/ThinkFlowGPT",
                  ],
                  founder: {
                    "@type": "Person",
                    "@id": "https://thinkflowgpt.vercel.app/#founder",
                    name: "Gaurav Upadhyay",
                    sameAs: ["https://gauravupadhyay.vercel.app"],
                    knowsAbout: ["Artificial Intelligence", "Workflow Automation"],
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://thinkflowgpt.vercel.app/#website",
                  url: "https://thinkflowgpt.vercel.app",
                  name: "ThinkFlowGPT",
                  publisher: {
                    "@id": "https://thinkflowgpt.vercel.app/#organization",
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target:
                      "https://thinkflowgpt.vercel.app/search?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://thinkflowgpt.vercel.app/#software",
                  name: "ThinkFlowGPT",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Web",
                  url: "https://thinkflowgpt.vercel.app",
                  provider: {
                    "@id": "https://thinkflowgpt.vercel.app/#organization",
                  },
                  description:
                    "An AI-native workflow automation platform leveraging agentic AI.",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
