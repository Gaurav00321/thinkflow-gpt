"use client";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  FileQuestion,
  HelpCircle,
  LifeBuoy,
  Mail,
  MessageSquare,
} from "lucide-react";

interface SupportTabsProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export function SupportTabs({ faqs }: SupportTabsProps) {
  return (
    <Tabs defaultValue="self-help" className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-3 mb-12">
        <TabsTrigger
          value="self-help"
          className="transition-all duration-300 ease-in-out"
        >
          Self Help
        </TabsTrigger>
        <TabsTrigger
          value="contact"
          className="transition-all duration-300 ease-in-out"
        >
          Contact Us
        </TabsTrigger>
        <TabsTrigger
          value="status"
          className="transition-all duration-300 ease-in-out"
        >
          System Status
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="self-help"
        className="animate-in fade-in-50 slide-in-from-bottom-5 duration-500"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Link href="/docs">
            <Card className="h-full cursor-pointer transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-4">
                <FileQuestion className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>
                    Browse our detailed product documentation
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/blog/getting-started-with-thinkflowgpt">
            <Card className="h-full cursor-pointer transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-4">
                <CheckCircle className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>
                    Step-by-step guides to using ThinkFlowGPT
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/tutorials">
            <Card className="h-full cursor-pointer transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-4">
                <MessageSquare className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Tutorials</CardTitle>
                  <CardDescription>
                    Learn through practical video tutorials
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/community">
            <Card className="h-full cursor-pointer transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-4">
                <HelpCircle className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Community</CardTitle>
                  <CardDescription>
                    Connect with other users and share tips
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </TabsContent>
      <TabsContent
        value="contact"
        className="animate-in fade-in-50 slide-in-from-bottom-5 duration-500"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Email Support</CardTitle>
                  <CardDescription>
                    Response within 24 hours on business days
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                For general inquiries or non-urgent issues, please email us at:
              </p>
              <p className="font-medium">support@thinkflowgpt.com</p>
              <Button className="mt-6 w-full">Send Email</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <LifeBuoy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Live Chat</CardTitle>
                  <CardDescription>
                    Available Monday-Friday, 9am-5pm EST
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                For immediate assistance, start a live chat with our support
                team.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Available for Pro, Business, and Enterprise customers.
              </p>
              <Button className="w-full">Start Live Chat</Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent
        value="status"
        className="animate-in fade-in-50 slide-in-from-bottom-5 duration-500"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-green-500" />
              All Systems Operational
            </CardTitle>
            <CardDescription>
              Last updated: {new Date().toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-2 border-b">
                <div className="flex items-center gap-3">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  <span className="font-medium">API Services</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  99.99% uptime
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <div className="flex items-center gap-3">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  <span className="font-medium">Chat Services</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  100% uptime
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <div className="flex items-center gap-3">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  <span className="font-medium">Dashboard</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  99.97% uptime
                </span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  <span className="font-medium">Authentication</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  99.95% uptime
                </span>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t">
              <h3 className="flex items-center gap-2 text-lg font-medium mb-4">
                <Clock className="h-5 w-5" />
                Incident History
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">API Latency Issues</h4>
                    <span className="text-sm text-muted-foreground">
                      April 15, 2023
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Resolved - The API latency issues have been resolved after
                    upgrading our database infrastructure.
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Scheduled Maintenance</h4>
                    <span className="text-sm text-muted-foreground">
                      March 2, 2023
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Completed - The scheduled maintenance was completed
                    successfully with no service disruptions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
