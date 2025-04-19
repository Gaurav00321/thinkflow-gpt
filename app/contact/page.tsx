"use client";

import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useForm, Controller } from "react-hook-form";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log("Form data being submitted:", data); // Debug log

    try {
      // Create form data object with all required fields for Web3Forms
      const formData = {
        access_key: "2585f290-c3d6-43d1-9544-312d6575b4a1",
        from_name: "ThinkFlowGPT Contact Form",
        subject: data.subject || "Contact Form Submission",
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        message: data.message,
      };

      console.log("Sending to Web3Forms:", formData); // Debug log

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status); // Debug log

      const result = await response.json();
      console.log("Response data:", result); // Debug log

      if (result.success) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you as soon as possible.",
          className: "bg-green-100 border-green-300 text-green-800",
          action: (
            <div className="h-6 w-6 bg-green-200 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-green-700" />
            </div>
          ),
        });

        // Reset form
        reset();
      } else {
        console.error("Form submission failed:", result); // Debug log
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          description:
            result.message ||
            "Please try again later or contact us directly via email.",
          className: "bg-red-100 border-red-400 text-red-900",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error); // Debug log
      toast({
        variant: "destructive",
        title: "Error sending message",
        description: "Please try again later or contact us directly via email.",
        className: "bg-red-100 border-red-400 text-red-900",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Get in Touch
            </h1>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>
        </section>

        <section className="container pb-12 md:pb-24 lg:pb-32">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Reach out to us through any of these channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Our Location</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Waghodia, Vadodara District
                        <br />
                        Gujarat, India 391760
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        General Inquiries:{" "}
                        <span className="font-medium">
                          info@thinkflowgpt.com
                        </span>
                        <br />
                        Support:{" "}
                        <span className="font-medium">
                          support@thinkflowgpt.com
                        </span>
                        <br />
                        Enterprise Sales:{" "}
                        <span className="font-medium">
                          sales@thinkflowgpt.com
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Call Us</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Main Office:{" "}
                        <span className="font-medium">+91 727-574-2642</span>
                        <br />
                        Support Line:{" "}
                        <span className="font-medium">+91 (0250) 243-9603</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Clock className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Business Hours</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Monday - Friday: 9:00 AM - 6:00 PM (IST)
                        <br />
                        Saturday & Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="relative h-[300px] rounded-lg overflow-hidden bg-primary/10">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-bold mb-1">
                      ThinkFlowGPT Headquarters
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Located in the heart of Gujarat's Vadodara District
                    </p>
                    <p className="text-sm mt-2">
                      Waghodia, Vadodara District
                      <br />
                      Gujarat, IND 391760
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as
                  possible
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0 pt-4 pb-0">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="firstName"
                        className="text-sm font-medium"
                      >
                        First Name
                      </label>
                      <Controller
                        name="firstName"
                        control={control}
                        rules={{ required: "First name is required" }}
                        render={({ field }) => (
                          <div>
                            <Input
                              id="firstName"
                              placeholder="John"
                              {...field}
                              className={
                                errors.firstName ? "border-red-500" : ""
                              }
                            />
                            {errors.firstName && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {errors.firstName.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <Controller
                        name="lastName"
                        control={control}
                        rules={{ required: "Last name is required" }}
                        render={({ field }) => (
                          <div>
                            <Input
                              id="lastName"
                              placeholder="Doe"
                              {...field}
                              className={
                                errors.lastName ? "border-red-500" : ""
                              }
                            />
                            {errors.lastName && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {errors.lastName.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => (
                        <div>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            {...field}
                            className={errors.email ? "border-red-500" : ""}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Controller
                      name="subject"
                      control={control}
                      rules={{ required: "Please select a subject" }}
                      render={({ field }) => (
                        <div>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger
                              className={errors.subject ? "border-red-500" : ""}
                            >
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="General Inquiry">
                                General Inquiry
                              </SelectItem>
                              <SelectItem value="Technical Support">
                                Technical Support
                              </SelectItem>
                              <SelectItem value="Billing Question">
                                Billing Question
                              </SelectItem>
                              <SelectItem value="Partnership Opportunity">
                                Partnership Opportunity
                              </SelectItem>
                              <SelectItem value="Product Feedback">
                                Product Feedback
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.subject && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {errors.subject.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Controller
                      name="message"
                      control={control}
                      rules={{
                        required: "Please enter your message",
                        minLength: {
                          value: 10,
                          message: "Message should be at least 10 characters",
                        },
                      }}
                      render={({ field }) => (
                        <div>
                          <Textarea
                            id="message"
                            placeholder="Tell us how we can help..."
                            rows={5}
                            {...field}
                            className={errors.message ? "border-red-500" : ""}
                          />
                          {errors.message && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {errors.message.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    By submitting this form, you agree to our{" "}
                    <Link
                      href="/privacy"
                      className="underline underline-offset-2"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container pb-12 md:pb-24 lg:pb-32 max-w-5xl">
          <div className="rounded-lg bg-muted p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    Need immediate assistance?
                  </h3>
                  <p className="text-muted-foreground">
                    Check our comprehensive support resources
                  </p>
                </div>
              </div>
              <Button asChild className="min-w-[150px]">
                <Link href="/support">Visit Support Center</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
