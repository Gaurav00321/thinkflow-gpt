"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthModal } from "@/components/auth/auth-modal-provider";

export function Navbar() {
  const pathname = usePathname();
  const { user, signIn, signOut } = useAuth();
  const { openAuthModal } = useAuthModal();
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
      transition={{ type: "spring", stiffness: 300, damping: 30 }}      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-500/5"
          : "bg-background/90 backdrop-blur-lg"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
          <Link href="/" className="group flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}              className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700"
            >
              <BrainCircuit className="h-5 w-5 text-white drop-shadow-[0_0_3px_rgba(168,85,247,0.8)]" />
            </motion.div>
            <motion.span
              className="hidden sm:inline-block font-bold text-lg sm:text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 "
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              ThinkFlowGPT
            </motion.span>
          </Link>

          <nav className="hidden md:flex gap-1 lg:gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onMouseEnter={() => setHoveredItem(route.href)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={(e) => {
                   if (route.href === "/dashboard" && !user) {
                      e.preventDefault();
                      openAuthModal();
                   }
                }}
                className="relative px-2 py-1"
              >                <span
                  className={`relative z-10 text-sm font-medium transition-colors ${
                    route.active
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {route.label}
                </span>                {/* Animated highlight */}
                {(hoveredItem === route.href || route.active) && (
                  <motion.span
                    className="absolute inset-0 z-0 rounded-md bg-gradient-to-r from-purple-500 to-purple-700 "
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
            className="flex items-center gap-2 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 rounded-md hover:bg-gray-100/10"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </motion.div>
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
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
                    className="rounded-full relative overflow-hidden group h-9 w-9 border border-purple-500/20"
                  >
                    <Avatar className="h-full w-full">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-purple-900 text-purple-200 text-xs">
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 overflow-hidden bg-black/90 backdrop-blur-xl border-purple-500/20 text-purple-100">
                <div className="flex items-center gap-2 p-2 border-b border-purple-500/20">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center overflow-hidden">
                     {user.user_metadata?.avatar_url ? (
                        <img src={user.user_metadata.avatar_url} alt="User" className="h-full w-full object-cover" />
                     ) : (
                        <User className="h-4 w-4 text-white" />
                     )}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium truncate">
                      {user.user_metadata?.full_name || "User"}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </span>
                  </div>
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer hover:bg-purple-900/40 focus:bg-purple-900/40">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/api-keys" className="cursor-pointer hover:bg-purple-900/40 focus:bg-purple-900/40">
                    <Key className="mr-2 h-4 w-4" />
                    <span>API Keys</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/pricing" className="cursor-pointer hover:bg-purple-900/40 focus:bg-purple-900/40">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing (Pro)</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="cursor-pointer hover:bg-purple-900/40 focus:bg-purple-900/40">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-purple-500/20" />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="cursor-pointer hover:bg-red-900/20 focus:bg-red-900/20 text-red-300 focus:text-red-200"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Button
                  onClick={openAuthModal}
                  className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 border-none text-sm h-9 px-4"
                  variant="default"
                >
                  <span className="relative z-10">Sign in</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-md" />
                  <Sparkles className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                </Button>
              </motion.div>
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
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-lg border-b"
          >
            <nav className="container flex flex-col py-4">
              {routes.map((route) => (
                <motion.div
                  key={route.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={route.href}
                    className={`flex items-center px-3 py-2.5 rounded-md text-sm transition-colors ${
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
