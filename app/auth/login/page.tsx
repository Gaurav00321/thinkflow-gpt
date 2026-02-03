
"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react"; // Using Chrome icon as Google proxy
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        console.error("Login failed:", error);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false); // Probably won't run if redirect happens
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-zinc-900/50 p-10 backdrop-blur-xl border border-white/10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Sign in to continue to ThinkFlowGPT
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full h-12 bg-white text-black hover:bg-zinc-200 font-medium text-base rounded-xl transition-all"
          >
            {isLoading ? (
              <span className="animate-pulse">Connecting...</span>
            ) : (
              <>
                <Chrome className="mr-2 h-5 w-5" />
                Continue with Google
              </>
            )}
          </Button>

          <p className="text-center text-xs text-zinc-600">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
