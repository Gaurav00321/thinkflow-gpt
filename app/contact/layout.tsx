import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact ThinkFlowGPT | AI Workflow Support & Inquiries",
  description:
    "Reach out to the ThinkFlowGPT team for support, questions, business inquiries, or feedback. We're here to help you automate success.",
  keywords: [
    "ThinkFlowGPT Contact",
    "AI workflow support",
    "automation inquiries",
    "customer support",
    "business inquiries",
    "feedback ThinkFlowGPT",
  ],
  openGraph: {
    title: "Contact ThinkFlowGPT | AI Workflow Support & Inquiries",
    description:
      "Connect with the team behind ThinkFlowGPT to discuss AI-powered automation, business collaboration, or tech support.",
    type: "website",
    url: "https://thinkflowgpt.vercel.app/contact",
    siteName: "ThinkFlowGPT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact ThinkFlowGPT",
    description:
      "Support, feedback, and inquiries made easy with ThinkFlowGPT.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
