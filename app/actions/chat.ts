"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getChats() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data } = await supabase
        .from("chats")
        .select("*")
        .eq("user_id", user.id)
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false });

    return data;
}

export async function deleteChat(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("chats").delete().eq("id", id);

    if (error) {
        console.error("Error deleting chat:", error);
        return false;
    }

    revalidatePath("/chat");
    return true;
}

export async function clearChats() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase.from("chats").delete().eq("user_id", user.id);
    if (error) {
        console.error("Error clearing chats:", error);
        return false;
    }

    revalidatePath("/chat");
    return true;
}

export async function updateChat(id: string, payload: { title?: string; is_pinned?: boolean }) {
    const supabase = await createClient();

    const { error } = await supabase.from("chats").update(payload).eq("id", id);

    if (error) {
        console.error("Error updating chat:", error);
        return false;
    }

    revalidatePath("/chat");
    return true;
}

export async function getChat(id: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("chats")
        .select("*, messages(*)")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching chat:", error);
        return null;
    }

    return data;
}
