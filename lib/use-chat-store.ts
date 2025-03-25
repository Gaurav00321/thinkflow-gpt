import { create } from "zustand"

type ChatMessage = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

type Chat = {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: Date
}

interface ChatState {
  chats: Chat[]
  addChat: (chat: Chat) => void
  deleteChat: (chatId: string) => void
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  addChat: (chat) =>
    set((state) => ({
      chats: [...state.chats, chat],
    })),
  deleteChat: (chatId) =>
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== chatId),
    })),
}))

