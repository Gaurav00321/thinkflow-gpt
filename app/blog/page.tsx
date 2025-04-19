import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogCard } from "@/components/blog-card";

export const metadata: Metadata = {
  title: "Blog | Insights & Updates from ThinkFlowGPT",
  description:
    "Explore the latest insights, AI tutorials, productivity tips, and success stories from ThinkFlowGPT — the AI-powered assistant founded by Gaurav Upadhyay.",
  keywords: [
    "AI blog",
    "ThinkFlowGPT updates",
    "workflow automation",
    "AI productivity",
    "Gaurav Upadhyay",
    "AI case studies",
    "AI tutorials",
    "ethical AI",
  ],
  openGraph: {
    title: "ThinkFlowGPT Blog | AI News, Productivity & Automation",
    description:
      "Stay informed with the latest from ThinkFlowGPT — AI-powered insights, ethical practices, and smart automation by Gaurav Upadhyay.",
    type: "website",
    url: "https://thinkflowgpt.vercel.app/blog",
    siteName: "ThinkFlowGPT",
  },
  twitter: {
    card: "summary_large_image",
    title: "ThinkFlowGPT Blog",
    description:
      "Smart insights into AI automation, productivity, and success stories by ThinkFlowGPT, founded by Gaurav Upadhyay.",
  },
};

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Our Blog
            </h1>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 mt-4">
              <strong>ThinkFlowGPT</strong> is an AI-powered workflow assistant
              designed to help businesses and students automate their daily
              tasks and boost productivity. Founded by{" "}
              <strong>Gaurav Upadhyay</strong>, ThinkFlowGPT is on a mission to
              bring intelligent, ethical, and user-friendly automation to
              everyone. Stay updated with our latest articles, success stories,
              and innovations.
            </p>
          </div>
        </section>
        <section className="container pb-12 md:pb-24 lg:pb-32">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <BlogCard
              title="Getting Started with ThinkFlowGPT"
              description="Learn how to set up and start using ThinkFlowGPT to enhance your productivity."
              date="March 19, 2025"
              category="Tutorial"
              slug="getting-started-with-thinkflowgpt"
              image="/blog/getting-started.png"
            />
            <BlogCard
              title="10 Ways AI Can Boost Your Productivity"
              description="Discover how artificial intelligence tools like ThinkFlowGPT can help you work smarter, not harder."
              date="March 27, 2025"
              category="Productivity"
              slug="10-ways-ai-can-boost-productivity-with-thinkflowgpt"
              image="/blog/ai-productivity-with-thinkflowgpt.png"
            />
            <BlogCard
              title="The Future of Work with AI Assistants"
              description="How AI assistants are changing the workplace and what to expect in the coming years."
              date="March 30, 2025"
              category="Insights"
              slug="future-of-work-with-ai-assistants"
              image="/blog/ai-assistants.png"
            />
            <BlogCard
              title="Building Custom Workflows with ThinkFlowGPT"
              description="A step-by-step guide to creating automated workflows that save you time and effort."
              date="April 7, 2025"
              category="Tutorial"
              slug="building-custom-workflows-with-thinkflowgpt"
              image="/blog/custom-workflows-thinkflowgpt.png"
            />
            <BlogCard
              title="AI Ethics: Our Approach at ThinkFlowGPT"
              description="How we're building responsible AI systems that prioritize user privacy and ethical considerations."
              date="April 11, 2025"
              category="Company"
              slug="ai-ethics-our-approach-at-thinkflowgpt"
              image="/blog/ai-ethics-thinkflowgpt.png"
            />
            <BlogCard
              title="Case Study: How Company AmTop Increased Efficiency by 40%"
              description="Learn how a leading company leveraged ThinkFlowGPT to transform their operations."
              date="April 18, 2025"
              category="Case Study"
              slug="case-study-amtop-efficiency-boost"
              image="/blog/amtop-case-study.png"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
