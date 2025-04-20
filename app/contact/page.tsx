"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  Send,
  MessageSquare,
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
  const [isLoaded, setIsLoaded] = useState(false);
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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1 relative overflow-hidden">
        {/* Hero Section with Animated Background */}
        <div className="relative overflow-hidden bg-gradient-to-br from-black via-purple-950 to-black">
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 opacity-20">
              {isLoaded && (
                <>
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-purple-500"
                      initial={{
                        x: Math.random() * 100 - 50 + "%",
                        y: Math.random() * 100 - 50 + "%",
                        scale: Math.random() * 0.5 + 0.5,
                        opacity: Math.random() * 0.3 + 0.1,
                      }}
                      animate={{
                        x: [
                          Math.random() * 100 - 50 + "%",
                          Math.random() * 100 - 50 + "%",
                        ],
                        y: [
                          Math.random() * 100 - 50 + "%",
                          Math.random() * 100 - 50 + "%",
                        ],
                      }}
                      transition={{
                        duration: Math.random() * 20 + 10,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                      style={{
                        width: Math.random() * 300 + 50,
                        height: Math.random() * 300 + 50,
                        filter: "blur(80px)",
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          </div>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="container relative z-10 py-20 md:py-32"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-6 flex items-center justify-center space-x-2 rounded-full bg-purple-900/30 px-4 py-1 text-sm text-purple-200 backdrop-blur-md"
              >
                <MessageSquare className="h-4 w-4 text-purple-400" />
                <span>We'd love to hear from you</span>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400"
              >
                Get in Touch
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-6 max-w-[85%] text-lg text-purple-100/80 sm:text-xl"
              >
                Have questions or feedback? We're here to help you get the most
                out of ThinkFlowGPT.
              </motion.p>
            </motion.div>
          </motion.section>
        </div>

        {/* Contact Form Section */}
        <section className="container py-12 md:py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-2"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-center space-y-8"
            >
              <Card className="bg-purple-950/20 border-purple-500/20 backdrop-blur-md overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-white">
                    Contact Information
                  </CardTitle>
                  <CardDescription className="text-purple-200/70">
                    Reach out to us through any of these channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start space-x-4 p-3 rounded-lg transition-colors hover:bg-purple-900/20"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Our Location</h3>
                      <p className="text-sm text-purple-200/70 mt-1">
                        Waghodia, Vadodara District
                        <br />
                        Gujarat, India 391760
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start space-x-4 p-3 rounded-lg transition-colors hover:bg-purple-900/20"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Email Us</h3>
                      <p className="text-sm text-purple-200/70 mt-1">
                        General Inquiries:{" "}
                        <span className="font-medium text-purple-300">
                          info@thinkflowgpt.com
                        </span>
                        <br />
                        Support:{" "}
                        <span className="font-medium text-purple-300">
                          support@thinkflowgpt.com
                        </span>
                        <br />
                        Enterprise Sales:{" "}
                        <span className="font-medium text-purple-300">
                          sales@thinkflowgpt.com
                        </span>
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start space-x-4 p-3 rounded-lg transition-colors hover:bg-purple-900/20"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Call Us</h3>
                      <p className="text-sm text-purple-200/70 mt-1">
                        Main Office:{" "}
                        <span className="font-medium text-purple-300">
                          +91 727-574-2642
                        </span>
                        <br />
                        Support Line:{" "}
                        <span className="font-medium text-purple-300">
                          +91 (0250) 243-9603
                        </span>
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start space-x-4 p-3 rounded-lg transition-colors hover:bg-purple-900/20"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Business Hours</h3>
                      <p className="text-sm text-purple-200/70 mt-1">
                        Monday - Friday: 9:00 AM - 6:00 PM (IST)
                        <br />
                        Saturday & Sunday: Closed
                      </p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>

              <motion.div
                variants={itemVariants}
                className="relative h-[300px] rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-lg">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-900/50 flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-1 text-white">
                        ThinkFlowGPT Headquarters
                      </h3>
                      <p className="text-sm text-purple-200/70">
                        Located in the heart of Gujarat's Vadodara District
                      </p>
                      <p className="text-sm mt-2 text-purple-300">
                        Waghodia, Vadodara District
                        <br />
                        Gujarat, IND 391760
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-purple-950/20 border-purple-500/20 backdrop-blur-md overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-white">
                    Send us a Message
                  </CardTitle>
                  <CardDescription className="text-purple-200/70">
                    Fill out the form below and we'll get back to you as soon as
                    possible
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pt-4 pb-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="firstName"
                          className="text-sm font-medium text-purple-100"
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
                                className={`bg-purple-900/20 border-purple-700/30 text-white placeholder:text-purple-400/50 focus:border-purple-500 ${
                                  errors.firstName ? "border-red-500" : ""
                                }`}
                              />
                              {errors.firstName && (
                                <p className="text-red-400 text-xs mt-1 flex items-center">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  {errors.firstName.message}
                                </p>
                              )}
                            </div>
                          )}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="lastName"
                          className="text-sm font-medium text-purple-100"
                        >
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
                                className={`bg-purple-900/20 border-purple-700/30 text-white placeholder:text-purple-400/50 focus:border-purple-500 ${
                                  errors.lastName ? "border-red-500" : ""
                                }`}
                              />
                              {errors.lastName && (
                                <p className="text-red-400 text-xs mt-1 flex items-center">
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
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-purple-100"
                      >
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
                              className={`bg-purple-900/20 border-purple-700/30 text-white placeholder:text-purple-400/50 focus:border-purple-500 ${
                                errors.email ? "border-red-500" : ""
                              }`}
                            />
                            {errors.email && (
                              <p className="text-red-400 text-xs mt-1 flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {errors.email.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-sm font-medium text-purple-100"
                      >
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
                                className={`bg-purple-900/20 border-purple-700/30 text-white focus:border-purple-500 ${
                                  errors.subject ? "border-red-500" : ""
                                }`}
                              >
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                              <SelectContent className="bg-purple-900 border-purple-700 text-white">
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
                              <p className="text-red-400 text-xs mt-1 flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {errors.subject.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-purple-100"
                      >
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
                              className={`bg-purple-900/20 border-purple-700/30 text-white placeholder:text-purple-400/50 focus:border-purple-500 ${
                                errors.message ? "border-red-500" : ""
                              }`}
                            />
                            {errors.message && (
                              <p className="text-red-400 text-xs mt-1 flex items-center">
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
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-center text-purple-300/70">
                      By submitting this form, you agree to our{" "}
                      <Link
                        href="/privacy"
                        className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="rounded-lg bg-gradient-to-r from-purple-900/30 to-purple-800/20 border border-purple-500/20 p-8 backdrop-blur-md">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-purple-600 p-3">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Need immediate assistance?
                    </h3>
                    <p className="text-purple-200/70">
                      Check our comprehensive support resources
                    </p>
                  </div>
                </div>
                <Button
                  asChild
                  className="min-w-[150px] bg-purple-600 hover:bg-purple-700"
                >
                  <Link href="/support">Visit Support Center</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
