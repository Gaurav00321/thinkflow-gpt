"use server";

import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export async function generateApiKey(name: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    // Generate a random key
    const rawKey = `sk_tf_${uuidv4().replace(/-/g, "")}`;

    // Hash it
    const hashedKey = await bcrypt.hash(rawKey, 10);

    // Store in DB
    const { data, error } = await supabase
        .from("api_keys")
        .insert({
            user_id: user.id,
            name,
            key_hash: hashedKey,
            status: "active",
        })
        .select()
        .single();

    if (error) {
        console.error("Error creating API key:", error);
        throw new Error("Failed to create API key");
    }

    // Return the RAW key only once. Client must display it.
    return { ...data, key: rawKey };
}

export async function revokeApiKey(id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const { error } = await supabase
        .from("api_keys")
        .update({ status: "revoked" })
        .eq("id", id)
        .eq("user_id", user.id);

    if (error) {
        throw new Error("Failed to revoke API key");
    }

    return true;
}

export async function getApiKeys() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return [];
    }

    const { data, error } = await supabase
        .from("api_keys")
        .select("id, name, status, created_at, last_used_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching API keys:", error);
        return [];
    }

    return data;
}
