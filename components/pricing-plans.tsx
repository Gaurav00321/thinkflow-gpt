"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

interface PricingPlan {
  name: string
  description: string
  price: {
    monthly: number
    annually: number
  }
  features: string[]
  highlighted?: boolean
  badge?: string
  buttonText: string
  buttonVariant: "default" | "outline"
}

const plans: PricingPlan[] = [
  {
    name: "Free",
    description: "Essential AI features for personal use",
    price: {
      monthly: 0,
      annually: 0,
    },
    features: [
      "5 AI chat conversations per day",
      "Basic code assistance",
      "No chat history storage",
      "Community support",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
  },
  {
    name: "Pro",
    description: "Advanced features for professionals",
    price: {
      monthly: 19,
      annually: 190,
    },
    features: [
      "Unlimited AI conversations",
      "Advanced code assistance",
      "Saved chat history",
      "API access (50K requests/month)",
      "Priority support",
      "Custom AI personas",
    ],
    highlighted: true,
    badge: "Most Popular",
    buttonText: "Upgrade to Pro",
    buttonVariant: "default",
  },
  {
    name: "Enterprise",
    description: "Custom solutions for teams and businesses",
    price: {
      monthly: 99,
      annually: 990,
    },
    features: [
      "Everything in Pro",
      "Unlimited API requests",
      "Team collaboration",
      "Custom workflow automation",
      "Dedicated account manager",
      "SSO & advanced security",
      "Custom model training",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
  },
]

export function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly")
  const { user } = useAuth()
  const { toast } = useToast()

  const handleSubscribe = (plan: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to subscribe to a plan.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Subscription Processing",
      description: `You're being redirected to complete your ${plan} subscription.`,
    })
  }

  return (
    <section className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto mb-10 flex max-w-[58rem] items-center justify-center space-x-2">
        <span className={cn("text-sm", billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground")}>
          Monthly
        </span>
        <Switch
          checked={billingCycle === "annually"}
          onCheckedChange={(checked) => setBillingCycle(checked ? "annually" : "monthly")}
        />
        <span className={cn("text-sm", billingCycle === "annually" ? "text-foreground" : "text-muted-foreground")}>
          Annually
          <Badge variant="outline" className="ml-2 bg-primary/20 text-primary">
            Save 20%
          </Badge>
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={cn("flex flex-col", plan.highlighted && "border-primary shadow-lg")}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{plan.name}</CardTitle>
                {plan.badge && <Badge className="bg-primary text-primary-foreground">{plan.badge}</Badge>}
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  ${billingCycle === "monthly" ? plan.price.monthly : plan.price.annually}
                </span>
                {plan.price.monthly > 0 && (
                  <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
                )}
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan.name === "Enterprise" ? (
                <Link href="/contact" className="w-full">
                  <Button variant={plan.buttonVariant} className="w-full">
                    {plan.buttonText}
                  </Button>
                </Link>
              ) : (
                <Button variant={plan.buttonVariant} className="w-full" onClick={() => handleSubscribe(plan.name)}>
                  {plan.buttonText}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

