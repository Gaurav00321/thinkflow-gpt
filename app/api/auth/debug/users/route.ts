import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL!)

export async function GET() {
  try {
    const users = await sql`
      SELECT id, email, name, created_at, updated_at 
      FROM users 
      ORDER BY created_at DESC
    `

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
