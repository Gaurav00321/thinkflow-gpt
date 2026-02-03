import { create } from "zustand"
import { persist } from "zustand/middleware"
import { v4 as uuidv4 } from "uuid"

type Message = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

export type Chat = {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt?: Date
  isPinned?: boolean // Keeping as isPinned to match existing usage in some components, but referencing is_pinned in others. Ideally should standardize.
  // We'll normalize to isPinned in the store for consistency.
}

interface ChatStore {
  chats: Chat[]
  // Actions
  setChats: (chats: Chat[]) => void
  addChat: (chat: Chat) => void
  addMessage: (chatId: string, message: Message) => void
  updateChat: (id: string, updates: Partial<Chat>) => void
  removeChat: (id: string) => void
  clearChats: () => void
  
  // Optimistic Actions (UI first)
  pinChat: (id: string) => void
  renameChat: (id: string, title: string) => void
}

const sortChats = (chats: Chat[]) => {
  return [...chats].sort((a, b) => {
    // 1. Pinned first
    if (!!a.isPinned !== !!b.isPinned) {
      return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
    }
    
    // 2. Sort by Last Updated (or Created if updated missing)
    const timeA = new Date(a.updatedAt || a.createdAt).getTime();
    const timeB = new Date(b.updatedAt || b.createdAt).getTime();
    
    return timeB - timeA;
  });
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      
      setChats: (chats) => {
        // Normalize incoming data (e.g. from DB snake_case) if needed, 
        // but assuming transformation happens before calling setChats or we handle standard props
        const normalizedChats = chats.map(c => ({
            ...c,
            // Ensure dates are Date objects
            createdAt: new Date(c.createdAt),
            updatedAt: c.updatedAt ? new Date(c.updatedAt) : new Date(c.createdAt),
            isPinned: (c as any).is_pinned || c.isPinned 
        }));
        set({ chats: sortChats(normalizedChats) })
      },

      addChat: (chat) =>
        set((state) => {
           // Prevent duplicates
           if (state.chats.some(c => c.id === chat.id)) return state;
           return {
             chats: sortChats([{ 
                 ...chat, 
                 updatedAt: new Date(),
                 isPinned: false
             }, ...state.chats])
           };
        }),

      addMessage: (chatId, message) => 
        set((state) => ({
            chats: sortChats(state.chats.map((chat) => 
                chat.id === chatId 
                    ? { 
                        ...chat, 
                        messages: [...chat.messages, message],
                        updatedAt: new Date() // Bring to top
                      } 
                    : chat
            ))
        })),

      updateChat: (id, updates) =>
        set((state) => ({
          chats: sortChats(state.chats.map((chat) => 
            chat.id === id ? { ...chat, ...updates, updatedAt: new Date() } : chat
          )),
        })),

      removeChat: (id) =>
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== id),
        })),

      clearChats: () => set({ chats: [] }),

      pinChat: (id) =>
        set((state) => ({
          chats: sortChats(
            state.chats.map((chat) => 
                chat.id === id 
                    ? { ...chat, isPinned: !chat.isPinned, updatedAt: new Date() } 
                    : chat
            )
          ),
        })),

      renameChat: (id, title) =>
        set((state) => ({
          chats: state.chats.map((chat) => 
            chat.id === id 
                ? { ...chat, title, updatedAt: new Date() } 
                : chat
          ),
        })),
    }),
    {
      name: "chat-store",
    },
  ),
)

