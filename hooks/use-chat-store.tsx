"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

type Chat = {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
}

type ChatStore = {
  chats: Chat[]
  addChat: (chat: Chat) => void
  removeChat: (id: string) => void
  clearChats: () => void
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chats: [],
      addChat: (chat) =>
        set((state) => ({
          chats: [chat, ...state.chats],
        })),
      removeChat: (id) =>
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== id),
        })),
      clearChats: () => set({ chats: [] }),
    }),
    {
      name: "thinkflow-chats",
    },
  ),
)

