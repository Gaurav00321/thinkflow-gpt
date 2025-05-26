import { Suspense } from "react";
import AuthForm from "@/components/auth-form";
import ParticleBackground from "@/components/features/particle-background";
import AIAssistant from "@/components/ai-assistant";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-black to-purple-950 pt-16">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <ParticleBackground />
        </Suspense>

        <div className="relative z-10 w-full max-w-md px-4 py-8 sm:py-12">
          <div className="backdrop-blur-md bg-black/30 border border-purple-500/20 rounded-xl shadow-[0_0_15px_rgba(149,76,233,0.25)] p-6 sm:p-8">
            <AuthForm />
          </div>
        </div>

        <div className="fixed bottom-8 right-8 z-10">
          <AIAssistant />
        </div>
      </main>
    </>
  );
}
