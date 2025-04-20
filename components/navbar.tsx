"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  X,
  User,
  Settings,
  LogOut,
  CreditCard,
  Key,
  Sparkles,
  BrainCircuit,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const { user, signIn, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/features",
      label: "Features",
      active: pathname === "/features",
    },
    {
      href: "/about",
      label: "About",
      active: pathname === "/about" || pathname.startsWith("/about/"),
    },
    {
      href: "/blog",
      label: "Blog",
      active: pathname === "/blog" || pathname.startsWith("/blog/"),
    },
    {
      href: "/chat",
      label: "Chat",
      active: pathname === "/chat",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard" || pathname.startsWith("/dashboard/"),
    },
    {
      href: "/pricing",
      label: "Pricing",
      active: pathname === "/pricing",
    },
    {
      href: "/api",
      label: "API",
      active: pathname === "/api",
    },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg shadow-lg"
          : "bg-background/50 backdrop-blur-md"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="group flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-800"
            >
              <BrainCircuit className="h-5 w-5 text-white" />
            </motion.div>
            <motion.span
              className="hidden font-bold sm:inline-block text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              ThinkFlowGPT
            </motion.span>
          </Link>

          <nav className="hidden gap-6 md:flex">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onMouseEnter={() => setHoveredItem(route.href)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative px-2 py-1"
              >
                <span
                  className={`relative z-10 text-sm font-medium transition-colors ${
                    route.active
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {route.label}
                </span>

                {/* Animated highlight */}
                {(hoveredItem === route.href || route.active) && (
                  <motion.span
                    className="absolute inset-0 z-0 rounded-md bg-gradient-to-r from-purple-500/10 to-purple-700/10"
                    layoutId="navbar-highlight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <button
            className="flex items-center space-x-2 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.div>
            <span className="font-bold text-xl">ThinkFlowGPT</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-800/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <User className="h-5 w-5" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 overflow-hidden">
                <div className="flex items-center gap-2 p-2 border-b">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {user.name || "User"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user.email || "user@example.com"}
                    </span>
                  </div>
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/api-keys" className="cursor-pointer">
                    <Key className="mr-2 h-4 w-4" />
                    <span>API Keys</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/billing" className="cursor-pointer">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/signin">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Button
                  className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 border-none"
                  variant="default"
                >
                  <span className="relative z-10">Sign in</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-md" />
                  <Sparkles className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                </Button>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-70 blur-sm transition-all duration-300 rounded-md" />
              </motion.div>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="container md:hidden overflow-hidden"
          >
            <nav className="flex flex-col gap-3 py-4">
              {routes.map((route) => (
                <motion.div
                  key={route.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={route.href}
                    className={`flex items-center px-2 py-2 rounded-md transition-colors ${
                      route.active
                        ? "bg-gradient-to-r from-purple-500/20 to-purple-700/20 text-foreground"
                        : "text-foreground/60 hover:text-foreground hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-purple-700/10"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {route.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
