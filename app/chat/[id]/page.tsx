"use client";

import { use, Suspense } from "react";
import ChatPage from "../page";
import { useRouter } from "next/navigation";

// Since we are reusing the ChatPage logic which reads from searchParams,
// we can either redirect to /chat?id=... OR reuse the component.
// Reusing component is cleaner but ChatPage reads searchParams.get('id').
// Let's create a wrapper that pushes state or redirects.

// Redirection approach is safest for now to ensure one source of truth.
// But checking "Server Side Data Fetching" requirement -> If we want OG tags later, we need server component.
// For "Fix 404", a redirect is sufficient MVP.

export default function SharedChatPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params); // React.use to unwrap promise in Next.js 15

  // Client-side redirect to query param version
  if (typeof window !== "undefined") {
      router.replace(`/chat?id=${resolvedParams.id}`);
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black text-white">
      <p>Loading shared chat...</p>
    </div>
  );
}
