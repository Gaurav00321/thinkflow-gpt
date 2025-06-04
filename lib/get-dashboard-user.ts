import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getDashboardUser() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('user-session')
  
  if (!sessionCookie) {
    return null
  }
  
  try {
    return JSON.parse(sessionCookie.value)
  } catch {
    return null
  }
}
