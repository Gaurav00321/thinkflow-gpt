"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { ArrowRight, Mail, User, AlertCircle } from "lucide-react"
import { signInAction, signUpAction } from "@/lib/auth-actions"
import { useAuth } from "@/hooks/use-auth"

interface AuthFormProps {
  onSuccess?: () => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const router = useRouter()
  const { signIn } = useAuth()
  const [activeTab, setActiveTab] = useState("signin")
  const [signInState, signInFormAction, isSigningIn] = useActionState(signInAction, null)
  interface AuthState {
    success?: boolean
    error?: string
    user?: any
  }

  const [signUpState, signUpFormAction, isSigningUp] = useActionState(signUpAction, null)
  useEffect(() => {
    const handleSuccess = (state: AuthState | null) => {
      if (state?.success && state?.user) {
        // signIn() is now a no-op or trigger, state is handled by onAuthStateChange
        signIn();
        
        if (onSuccess) {
          // If modal, just call success callback
          onSuccess();
        } else {
          // Default behavior: redirect
          const timer = setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
          return () => clearTimeout(timer);
        }
      }
    };

    handleSuccess(signInState as AuthState | null);
    handleSuccess(signUpState as AuthState | null);
  }, [signInState?.success, signUpState?.success, router, signIn, onSuccess])

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">Welcome to ThinkFlowGPT</h1>
        <p className="text-purple-300/80 text-sm">The advanced AI automation platform</p>
      </div>

      <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-purple-500/30">
          <TabsTrigger
            value="signin"
            className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white text-purple-300"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white text-purple-300"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signin" className="space-y-4 mt-4 sm:mt-6">
          <form action={signInFormAction} className="space-y-4">
            {signInState?.error && (
              <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-md text-red-300">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{signInState.error}</span>
              </div>
            )}            {signInState?.success && (
              <>
                <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-500/30 rounded-md text-green-300">
                  <span className="text-sm">Successfully signed in! Redirecting to dashboard...</span>
                </div>
                {/* Redirect handled in useEffect */}
              </>
            )}

            <GlowingInput
              type="email"
              name="email"
              placeholder="Email"
              required
              icon={<Mail className="h-4 w-4 text-purple-400" />}
            />
            <GlowingInput type="password" name="password" placeholder="Password" required />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-purple-500/50 bg-black/30 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="remember" className="text-sm text-purple-300">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <PulseButton type="submit" disabled={isSigningIn}>
              {isSigningIn ? "Signing In..." : "Sign In"} <ArrowRight className="ml-2 h-4 w-4" />
            </PulseButton>
          </form>

          <div className="relative my-4 sm:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-500/20"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-black/30 px-2 text-purple-300 backdrop-blur-sm">Or continue with</span>
            </div>
          </div>

          <GoogleButton />
        </TabsContent>

        <TabsContent value="signup" className="space-y-4 mt-4 sm:mt-6">
          <form action={signUpFormAction} className="space-y-4">
            {signUpState?.error && (
              <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-md text-red-300">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{signUpState.error}</span>
              </div>
            )}            {signUpState?.success && (
              <>
                <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-500/30 rounded-md text-green-300">
                  <span className="text-sm">Account created successfully! Redirecting to dashboard...</span>
                </div>
                {/* Redirect handled in useEffect */}
              </>
            )}

            <GlowingInput
              type="text"
              name="name"
              placeholder="Full Name"
              icon={<User className="h-4 w-4 text-purple-400" />}
            />
            <GlowingInput
              type="email"
              name="email"
              placeholder="Email"
              required
              icon={<Mail className="h-4 w-4 text-purple-400" />}
            />
            <GlowingInput type="password" name="password" placeholder="Password" required />
            <GlowingInput type="password" name="confirmPassword" placeholder="Confirm Password" required />

            <PulseButton type="submit" disabled={isSigningUp}>
              {isSigningUp ? "Creating Account..." : "Create Account"} <ArrowRight className="ml-2 h-4 w-4" />
            </PulseButton>
          </form>

          <div className="relative my-4 sm:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-500/20"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-black/30 px-2 text-purple-300 backdrop-blur-sm">Or continue with</span>
            </div>
          </div>

          <GoogleButton />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function GlowingInput({
  type,
  name,
  placeholder,
  icon,
  required = false,
}: {
  type: string
  name?: string
  placeholder: string
  icon?: React.ReactNode
  required?: boolean
}) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div
      className={`relative transition-all duration-300 ${isFocused ? "shadow-[0_0_10px_rgba(149,76,233,0.5)]" : ""}`}
    >
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 opacity-20"></div>
      <div className="relative flex items-center">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>}
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          className={`border border-purple-500/30 bg-black/50 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 ${
            icon ? "pl-10" : ""
          }`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  )
}

function PulseButton({
  children,
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}) {
  return (
    <motion.div whileHover={{ scale: disabled ? 1 : 1.02 }} className="w-full">
      <Button
        type={type}
        disabled={disabled}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600/0 via-purple-300/30 to-purple-600/0 group-hover:animate-shimmer"
          style={{ transform: "translateX(-100%)" }}
        ></div>
        <span className="relative z-10 flex items-center justify-center">{children}</span>
      </Button>
    </motion.div>
  )
}

function GoogleButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const { createClient } = await import("@/utils/supabase/client")
      const supabase = createClient()
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      
      if (error) {
        console.error("Google login failed:", error)
        setIsLoading(false)
      }
      // If successful, user will be redirected, so no need to setIsLoading(false)
    } catch (error) {
      console.error("Google login failed:", error)
      setIsLoading(false)
    }
  }

  return (
    <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} className="w-full">
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full border border-purple-500/30 bg-black/30 text-white hover:bg-purple-900/20 hover:border-purple-400/50 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600/0 via-purple-300/10 to-purple-600/0 group-hover:animate-shimmer"
          style={{ transform: "translateX(-100%)" }}
        ></div>
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connecting...
          </span>
        ) : (
          <>
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Continue with Google
          </>
        )}
      </Button>
    </motion.div>
  )
}
