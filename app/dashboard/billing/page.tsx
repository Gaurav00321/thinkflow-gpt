"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download } from "lucide-react"
import Link from "next/link"

export default function BillingPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("subscription")

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>Please sign in to access billing information.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/" className="w-full">
                <Button className="w-full">Back to Home</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
            <p className="text-muted-foreground">Manage your subscription and billing information.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="subscription" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          </TabsList>

          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>You are currently on the Pro plan.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">Pro Plan</h3>
                      <p className="text-sm text-muted-foreground">$19/month</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div>
                    <p className="text-sm">Your plan renews on April 21, 2025</p>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-2">Plan Features</h4>
                    <ul className="text-sm space-y-1">
                      <li>Unlimited AI conversations</li>
                      <li>Advanced code assistance</li>
                      <li>Saved chat history</li>
                      <li>API access (50K requests/month)</li>
                      <li>Priority support</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <Link href="/pricing" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Change Plan
                  </Button>
                </Link>
                <Button variant="destructive" className="w-full sm:w-auto">
                  Cancel Subscription
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>View and download your past invoices.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "Mar 21, 2025", amount: "$19.00", status: "Paid" },
                    { date: "Feb 21, 2025", amount: "$19.00", status: "Paid" },
                    { date: "Jan 21, 2025", amount: "$19.00", status: "Paid" },
                  ].map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Invoice #{2025030 + index}</p>
                        <p className="text-sm text-muted-foreground">{invoice.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>{invoice.amount}</span>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                        >
                          {invoice.status}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <CreditCard className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 04/2026</p>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Add Payment Method</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

