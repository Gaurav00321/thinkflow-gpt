"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Copy, Plus, Trash2, RefreshCw, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { v4 as uuidv4 } from "uuid"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: Date
  lastUsed: Date | null
}

export default function ApiKeysPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "Production API Key",
      key: "tfgpt_" + uuidv4().replace(/-/g, ""),
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
  ])
  const [newKeyName, setNewKeyName] = useState("")
  const [deleteKeyId, setDeleteKeyId] = useState<string | null>(null)
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null)

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>Please sign in to access API keys.</CardDescription>
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

  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your API key.",
        variant: "destructive",
      })
      return
    }

    const newKey: ApiKey = {
      id: uuidv4(),
      name: newKeyName,
      key: "tfgpt_" + uuidv4().replace(/-/g, ""),
      createdAt: new Date(),
      lastUsed: null,
    }

    setApiKeys([...apiKeys, newKey])
    setNewKeyName("")

    toast({
      title: "API Key Created",
      description: "Your new API key has been created successfully.",
    })
  }

  const handleCopyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKeyId(id)
    setTimeout(() => setCopiedKeyId(null), 2000)

    toast({
      title: "API Key Copied",
      description: "Your API key has been copied to clipboard.",
    })
  }

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id))
    setDeleteKeyId(null)

    toast({
      title: "API Key Deleted",
      description: "Your API key has been deleted successfully.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
            <p className="text-muted-foreground">
              Manage your API keys to integrate ThinkFlowGPT into your applications.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="keys">
          <TabsList>
            <TabsTrigger value="keys">API Keys</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>
          <TabsContent value="keys" className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Keep your API keys secure</AlertTitle>
              <AlertDescription>
                Your API keys have access to your account and should be kept secure. If you believe an API key has been
                compromised, regenerate it immediately.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>Create New API Key</CardTitle>
                <CardDescription>
                  Create a new API key to integrate ThinkFlowGPT into your applications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">API Key Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Production, Development, Testing"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleCreateKey}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create API Key
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your API Keys</CardTitle>
                <CardDescription>Manage your existing API keys.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiKeys.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      You don't have any API keys yet. Create one to get started.
                    </div>
                  ) : (
                    apiKeys.map((apiKey) => (
                      <div
                        key={apiKey.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="space-y-1">
                          <div className="font-medium">{apiKey.name}</div>
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-muted px-2 py-1 rounded">
                              {apiKey.key.substring(0, 8)}...{apiKey.key.substring(apiKey.key.length - 4)}
                            </code>
                            <Button variant="ghost" size="icon" onClick={() => handleCopyKey(apiKey.key, apiKey.id)}>
                              {copiedKeyId === apiKey.id ? (
                                <Badge variant="outline" className="px-2 py-0">
                                  Copied
                                </Badge>
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Created: {new Date(apiKey.createdAt).toLocaleDateString()}
                            {apiKey.lastUsed && <> • Last used: {new Date(apiKey.lastUsed).toLocaleDateString()}</>}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newKey = "tfgpt_" + uuidv4().replace(/-/g, "")
                              setApiKeys(
                                apiKeys.map((key) =>
                                  key.id === apiKey.id
                                    ? { ...key, key: newKey, createdAt: new Date(), lastUsed: null }
                                    : key,
                                ),
                              )
                              toast({
                                title: "API Key Regenerated",
                                description: "Your API key has been regenerated successfully.",
                              })
                            }}
                          >
                            <RefreshCw className="mr-2 h-3 w-3" />
                            Regenerate
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => setDeleteKeyId(apiKey.id)}>
                            <Trash2 className="mr-2 h-3 w-3" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="usage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Usage</CardTitle>
                <CardDescription>Monitor your API usage and limits.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Current Plan: Pro</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Monthly Requests</span>
                        <span>12,345 / 50,000</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "25%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>25% used</span>
                        <span>Resets in 18 days</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Rate Limits</h3>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>10 requests per minute</li>
                      <li>Maximum 4,096 tokens per request</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/pricing">
                  <Button variant="outline">Upgrade Plan</Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AlertDialog open={deleteKeyId !== null} onOpenChange={() => setDeleteKeyId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete API Key</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your API key and any applications using it will
              no longer be able to access the ThinkFlowGPT API.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteKeyId && handleDeleteKey(deleteKeyId)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

