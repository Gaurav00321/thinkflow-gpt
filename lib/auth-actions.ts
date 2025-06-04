"use server"

import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL!)

export async function signUpAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const name = formData.get("name") as string

  if (!email || !password || !confirmPassword) {
    return { error: "All fields are required" }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" }
  }

  try {
    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUser.length > 0) {
      return { error: "User already exists with this email" }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user
    const newUser = await sql`
      INSERT INTO users (email, password_hash, name)
      VALUES (${email}, ${passwordHash}, ${name})
      RETURNING id, email, name
    `

    // Set session cookie safely
    try {
      const cookieStore = await cookies()
      cookieStore.set(
        "user-session",
        JSON.stringify({
          id: newUser[0].id,
          email: newUser[0].email,
          name: newUser[0].name,
        }),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        },
      )
    } catch (cookieError) {
      console.log("Cookie setting failed:", cookieError)
      // Continue without setting cookie for now
    }    return {
      success: true,
      user: newUser[0],
      redirect: "/dashboard"
    }
  } catch (error) {
    console.error("Sign up error:", error)
    return { error: "Failed to create account" }
  }
}

export async function signInAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  // Add artificial delay to allow for cookie to be set
  await new Promise(resolve => setTimeout(resolve, 100));

  try {
    // Find user
    const user = await sql`
      SELECT id, email, name, password_hash FROM users WHERE email = ${email}
    `

    if (user.length === 0) {
      return { error: "Invalid email or password" }
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user[0].password_hash)

    if (!isValidPassword) {
      return { error: "Invalid email or password" }
    }

    // Set session cookie safely
    try {
      const cookieStore = await cookies()
      cookieStore.set(
        "user-session",
        JSON.stringify({
          id: user[0].id,
          email: user[0].email,
          name: user[0].name,
        }),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        },
      )
    } catch (cookieError) {
      console.log("Cookie setting failed:", cookieError)
      // Continue without setting cookie for now
    }    return {
      success: true,
      user: { id: user[0].id, email: user[0].email, name: user[0].name },
      redirect: "/dashboard"
    }
  } catch (error) {
    console.error("Sign in error:", error)
    return { error: "Failed to sign in" }
  }
}

export async function signOutAction() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("user-session")
  } catch (error) {
    console.log("Sign out error:", error)
  }
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("user-session")

    if (!sessionCookie) {
      return null
    }

    const user = JSON.parse(sessionCookie.value)
    return user
  } catch (error) {
    return null
  }
}
