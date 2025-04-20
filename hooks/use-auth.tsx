"use client";

import type React from "react";

import { createContext, useContext, useState } from "react";

type User = {
  id: string;
  name?: string;
  email?: string;
} | null;

type AuthContextType = {
  user: User;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const signIn = () => {
    // Mock sign in for demo
    setUser({
      id: "1",
      name: "Demo User",
      email: "user@example.com",
    });
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
