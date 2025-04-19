import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { SupportTabs } from "@/components/support-tabs";

export const metadata: Metadata = {
  title: "Support - ThinkFlowGPT",
  description:
    "Get help with ThinkFlowGPT. Browse our knowledge base, FAQs, or contact our support team.",
  openGraph: {
    title: "Support - ThinkFlowGPT",
    description:
      "Get help with ThinkFlowGPT. Browse our knowledge base, FAQs, or contact our support team.",
    type: "website",
  },
};

const faqs = [
  {
    question: "How do I get started with ThinkFlowGPT?",
    answer:
      "To get started, simply sign up for an account by clicking the 'Try for free' button on the homepage. Once you've created your account, you can immediately start using our AI chat assistant. Check out our 'Getting Started' guide in our blog for a more detailed walkthrough.",
  },
  {
    question: "What subscription plans do you offer?",
    answer:
      "We offer several subscription tiers including Free, Pro, Business, and Enterprise plans. Each plan offers different features, usage limits, and support options. Visit our Pricing page to see detailed information about each plan and choose the one that best fits your needs.",
  },
  {
    question: "Can I use ThinkFlowGPT on mobile devices?",
    answer:
      "Yes, ThinkFlowGPT is fully responsive and works on all devices including smartphones and tablets. You can access the platform through any modern web browser without needing to download an app.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your subscription at any time from your account dashboard. Go to Settings > Billing and click on 'Cancel Subscription'. Your plan will remain active until the end of your current billing period.",
  },
  {
    question: "Is my data secure with ThinkFlowGPT?",
    answer:
      "Yes, security is our top priority. We use enterprise-grade encryption to protect your data, and we never sell your information to third parties. You can learn more about our security practices and data policies in our Privacy Policy.",
  },
  {
    question: "Can I export my chat history?",
    answer:
      "Yes, you can export your entire chat history in various formats including PDF, JSON, and plain text. Go to your chat history, select the conversations you want to export, and click the 'Export' button.",
  },
  {
    question: "How can I integrate ThinkFlowGPT with my existing tools?",
    answer:
      "ThinkFlowGPT offers robust API access that allows you to integrate with a wide range of tools. We provide SDKs for popular programming languages and detailed API documentation to help you set up integrations. For more complex integrations, our Enterprise plan includes dedicated integration support.",
  },
  {
    question: "What languages does ThinkFlowGPT support?",
    answer:
      "Currently, ThinkFlowGPT supports English, Spanish, French, German, Japanese, and Chinese, with more languages being added regularly. The quality and capabilities might vary slightly between languages.",
  },
];

export default function SupportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              How can we help?
            </h1>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Get the support you need to make the most of ThinkFlowGPT
            </p>
            <div className="relative mt-4 w-full max-w-2xl">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search our knowledge base..."
                className="w-full rounded-lg border pl-10 pr-4 py-6"
              />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2">
                Search
              </Button>
            </div>
          </div>
        </section>

        <section className="container pb-8 md:pb-12 lg:pb-24">
          <SupportTabs faqs={faqs} />
        </section>

        <section className="container pb-12 md:pb-24 lg:pb-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 rounded-lg bg-muted p-10 text-center">
            <h2 className="text-2xl font-bold">Still need help?</h2>
            <p className="text-muted-foreground">
              Our team is here to assist you with any specific questions or
              issues
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/docs">Browse Documentation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
