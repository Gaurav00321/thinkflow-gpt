import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import DashboardClient from './dashboard-client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "@/components/dashboard-charts"
import { Activity, Code, MessageSquare, Users, Zap, CreditCard } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"

import React from "react"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('user-session')

  if (!sessionCookie) {
    redirect('/signin')
  }

  try {
    const user = JSON.parse(sessionCookie.value)
    return (    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container py-6 space-y-6 mt-16 sm:mt-20">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user.name}! Here's an overview of your activity.</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/chat">
                <Button variant="default" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  New Chat
                </Button>
              </Link>
              <Link href="/api-keys">
                <Button variant="outline" className="border-purple-500/30 hover:border-purple-400/50">
                  <Code className="w-4 h-4 mr-2" />
                  API Keys
                </Button>
              </Link>
              <Link href="/billing">
                <Button variant="ghost" className="hover:bg-purple-900/20">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Billing
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-purple-500/20 bg-black/40 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-100">Total Conversations</CardTitle>
                <MessageSquare className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-50">24</div>
                <p className="text-xs text-purple-300">+12% from last month</p>
              </CardContent>
            </Card>
            <Card className="border-purple-500/20 bg-black/40 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-100">Code Snippets Generated</CardTitle>
                <Code className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-50">142</div>
                <p className="text-xs text-purple-300">+18% from last month</p>
              </CardContent>
            </Card>
            <Card className="border-purple-500/20 bg-black/40 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-100">Workflows Created</CardTitle>
                <Activity className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-50">8</div>
                <p className="text-xs text-purple-300">+2 from last month</p>
              </CardContent>
            </Card>
            <Card className="border-purple-500/20 bg-black/40 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-100">Team Members</CardTitle>
                <Users className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-50">3</div>
                <p className="text-xs text-purple-300">No change from last month</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="w-full justify-start bg-black/40 border border-purple-500/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600/20">Overview</TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600/20">Analytics</TabsTrigger>
              <TabsTrigger value="workflows" className="data-[state=active]:bg-purple-600/20">Workflows</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4 border-purple-500/20 bg-black/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-purple-100">Usage Over Time</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <LineChart />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3 border-purple-500/20 bg-black/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-purple-100">Usage by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChart />
                  </CardContent>
                </Card>
              </div>
              <Card className="border-purple-500/20 bg-black/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-100">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="rounded-full bg-purple-600/20 p-2">
                          <Zap className="h-4 w-4 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-purple-100">
                            {i === 1
                              ? "Created a new workflow"
                              : i === 2
                              ? "Generated code for API integration"
                              : "Completed onboarding tutorial"}
                          </p>
                          <p className="text-xs text-purple-300">
                            {i === 1 ? "2 hours ago" : i === 2 ? "Yesterday at 4:30 PM" : "2 days ago"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Card className="border-purple-500/20 bg-black/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-100">Usage by Feature</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <BarChart />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="workflows" className="space-y-4">
              <Card className="border-purple-500/20 bg-black/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-100">Your Workflows</CardTitle>
                  <CardDescription className="text-purple-300">Create and manage your automated workflows</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-purple-500/20 p-4 text-center bg-black/20">
                    <p className="text-sm text-purple-300 mb-4">You haven't created any workflows yet</p>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                      Create Workflow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Failed to parse user session:', error)
    redirect('/signin')
  }
}

