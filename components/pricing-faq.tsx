import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does the billing cycle work?",
    answer:
      "You can choose between monthly or annual billing. Annual billing offers a 20% discount compared to monthly billing. You can change your billing cycle at any time from your account settings.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For Enterprise plans, we also offer invoice-based payments with net-30 terms.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, you can try ThinkFlowGPT with our Free plan indefinitely. This gives you access to basic features so you can experience the platform before upgrading to a paid plan.",
  },
  {
    question: "How does API access work?",
    answer:
      "API access is available on Pro and Enterprise plans. Pro plans include 50,000 API requests per month, while Enterprise plans offer unlimited API requests. You can generate and manage your API keys from your dashboard.",
  },
  {
    question: "What happens if I exceed my API request limit?",
    answer:
      "If you exceed your monthly API request limit on the Pro plan, additional requests will be charged at $0.001 per request. You can also upgrade to the Enterprise plan for unlimited API requests.",
  },
]

export function PricingFAQ() {
  return (
    <section className="container py-12 md:py-24">
      <div className="mx-auto max-w-[58rem]">
        <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

