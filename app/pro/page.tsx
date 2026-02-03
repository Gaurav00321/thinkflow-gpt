
"use client";

import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

export default function ProPage() {
  return (
    <div className="container mx-auto py-20 px-4 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Upgrade to Pro</h1>
        <p className="text-xl text-muted-foreground">
          Unlock unlimited access and advanced features.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="rounded-2xl border bg-background p-8 relative">
          <h3 className="text-xl font-bold">Free</h3>
          <p className="text-3xl font-bold mt-4">$0 <span className="text-base text-muted-foreground font-normal">/ month</span></p>
          <p className="text-muted-foreground mt-2">Perfect for getting started.</p>
          
          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>200 messages per day</span>
            </li>
            <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Basic support</span>
            </li>
          </ul>

          <Button variant="outline" className="w-full mt-8" disabled>
            Current Plan
          </Button>
        </div>

        {/* Pro Plan */}
        <div className="rounded-2xl border border-primary bg-primary/5 p-8 relative shadow-lg">
          <div className="absolute top-0 right-0 p-4">
             <Star className="h-6 w-6 text-primary" fill="currentColor" />
          </div>
          <h3 className="text-xl font-bold text-primary">Pro</h3>
          <p className="text-3xl font-bold mt-4">$19 <span className="text-base text-muted-foreground font-normal">/ month</span></p>
          <p className="text-muted-foreground mt-2">For power users and builders.</p>
          
          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Unlimited messages</span>
            </li>
             <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>API Access</span>
            </li>
            <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Priority support</span>
            </li>
            <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Early access to new features</span>
            </li>
          </ul>

          <Button className="w-full mt-8" size="lg">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
}
