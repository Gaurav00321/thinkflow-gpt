"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type Message = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

type Chat = {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
}

interface ChatStore {
  chats: Chat[]
  addChat: (chat: Chat) => void
  updateChat: (id: string, chat: Partial<Chat>) => void
  removeChat: (id: string) => void
  clearChats: () => void
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chats: [],
      addChat: (chat) =>
        set((state) => ({
          chats: [chat, ...state.chats].slice(0, 50), // Limit to 50 chats
        })),
      updateChat: (id, updatedChat) =>
        set((state) => ({
          chats: state.chats.map((chat) => (chat.id === id ? { ...chat, ...updatedChat } : chat)),
        })),
      removeChat: (id) =>
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== id),
        })),
      clearChats: () => set({ chats: [] }),
    }),
    {
      name: "chat-store",
    },
  ),
)

