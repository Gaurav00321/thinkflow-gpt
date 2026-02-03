
"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, Trash2, Copy, Check, Key } from "lucide-react";
import { generateApiKey, revokeApiKey, getApiKeys } from "@/app/actions/api-keys";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/navbar";
import { useAuthModal } from "@/components/auth/auth-modal-provider";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [usage, setUsage] = useState(0);
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  
  const supabase = createClient();
  const router = useRouter();
  const { toast } = useToast();
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        openAuthModal();
        return;
      }
      setUser(user);

      // Fetch Profile (Usage Stats)
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profile) {
        setProfile(profile);
        setUsage(profile.message_count || 0);
      }

      // Fetch API Keys
      const keys = await getApiKeys();
      setApiKeys(keys);

      setIsLoading(false);
    };

    fetchData();
  }, [router, supabase, openAuthModal]);

  const handleCreateKey = async () => {
    try {
      const keyData = await generateApiKey(newKeyName || "My API Key");
      setApiKeys([keyData, ...apiKeys]);
      setNewKey(keyData.key); // Show raw key
      setNewKeyName("");
      toast({ title: "API Key created" });
    } catch (error) {
      toast({ title: "Failed to create key", variant: "destructive" });
    }
  };

  const handleRevokeKey = async (id: string) => {
    try {
      await revokeApiKey(id);
      setApiKeys(apiKeys.map(k => k.id === id ? { ...k, status: 'revoked' } : k));
      toast({ title: "API Key revoked" });
    } catch (error) {
      toast({ title: "Failed to revoke key", variant: "destructive" });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
    toast({ title: "Copied to clipboard" });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-black text-white">Loading...</div>;
  }

  if (!user) {
     return (
        <div className="min-h-screen bg-black flex flex-col">
           <Navbar />
           <div className="flex-1 flex items-center justify-center">
              <div className="text-center p-8">
                 <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
                 <p className="text-purple-300 mb-6">Please sign in to view your dashboard.</p>
                 <Button onClick={openAuthModal}>Sign In</Button>
              </div>
           </div>
        </div>
     )
  }

  const limit = profile?.plan_tier === 'pro' ? 'Unlimited' : 200;
  const usagePercent = typeof limit === 'number' ? (usage / limit) * 100 : 0;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto py-10 px-4 space-y-8 max-w-5xl mt-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-purple-900 text-purple-200">{user?.email?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" onClick={() => router.push("/chat")} className="border-purple-500/30 hover:bg-purple-900/20">Go to Chat</Button>
           <Button variant="destructive" onClick={() => supabase.auth.signOut().then(() => router.push("/"))}>Sign Out</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-purple-900/10 border-purple-500/20 text-white">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-purple-200">Plan Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{profile?.plan_tier || 'Free'}</div>
            <p className="text-xs text-purple-300/70">
              {profile?.plan_tier === 'pro' ? 'Premium features unlocked' : 'Upgrade for unlimited access'}
            </p>
            {profile?.plan_tier !== 'pro' && (
               <Button size="sm" className="mt-4 w-full bg-gradient-to-r from-purple-600 to-purple-800" onClick={() => router.push('/pricing')}>Upgrade to Pro</Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Daily Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usage} / {limit}</div>
            <Progress value={usagePercent} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Resets daily.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage your API keys for external access.</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button><Plus className="mr-2 h-4 w-4" /> Create New Key</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create API Key</DialogTitle>
                        <DialogDescription>Giye your key a name to identify it later.</DialogDescription>
                    </DialogHeader>
                    {newKey ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-muted rounded-md relative group">
                                <code className="break-all">{newKey}</code>
                                <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => copyToClipboard(newKey)}>
                                    {copiedKey ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                            <p className="text-sm text-destructive">
                                Copy this key now. You won't be able to see it again!
                            </p>
                            <Button className="w-full" onClick={() => { setIsDialogOpen(false); setNewKey(null); }}>Done</Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Key Name</Label>
                                <Input value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} placeholder="e.g. My App" />
                            </div>
                            <Button onClick={handleCreateKey} disabled={!newKeyName}>Generate</Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    {key.name}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${key.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {key.status}
                    </span>
                  </TableCell>
                  <TableCell>{formatDistanceToNow(new Date(key.created_at), { addSuffix: true })}</TableCell>
                  <TableCell>{key.last_used_at ? formatDistanceToNow(new Date(key.last_used_at), { addSuffix: true }) : 'Never'}</TableCell>
                  <TableCell className="text-right">
                    {key.status === 'active' && (
                        <Button variant="ghost" size="icon" onClick={() => handleRevokeKey(key.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {apiKeys.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-10">
                        No API keys found.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
