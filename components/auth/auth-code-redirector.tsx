"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function RedirectorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    
    if (code) {
      // Detected an auth code on the root page (Supabase redirect misconfiguration)
      // Forward to the correct callback route
      console.log("Detected auth code on root, redirecting to callback...");
      router.push(`/auth/callback?code=${code}&next=/dashboard`);
    } else if (error) {
        console.error("Auth error detected:", error);
        // Optionally show a toast or redirect to an error page
    }
  }, [searchParams, router]);

  return null;
}

export function AuthCodeRedirector() {
  return (
    <Suspense fallback={null}>
      <RedirectorContent />
    </Suspense>
  );
}
