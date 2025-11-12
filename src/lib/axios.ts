// src/lib/axios.ts
import axios from "axios"
import { getSession } from "next-auth/react"


const isDev = process.env.NODE_ENV === "development"

// In dev, route through Next.js proxy to avoid CORS
const baseURL = isDev
  ? "/api/proxy/api/v1" // ✅ goes through Next.js
  : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1` // ✅ direct in prod
  
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
})

// Automatically inject JWT token from NextAuth session
api.interceptors.request.use(
  async (config) => {
    const session = await getSession()
    const token = session?.user?.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)


// CALL API LIKE BELOW
// export async function getUserProfile() {
//   const res = await api.get("/api/v1/user/profile")
//   return res.data
// }
