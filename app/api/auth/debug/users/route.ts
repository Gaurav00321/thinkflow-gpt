import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Get the current user's session to verify auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // For debugging, just return the current user info
    // Note: Listing all users requires admin API which needs service role key
    return NextResponse.json({
      currentUser: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.user_metadata?.full_name,
        created_at: user.created_at,
      }
    })
  } catch (error) {
    console.error("Auth debug error:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}
