import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"
import { api } from "@/lib/axios"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // 🔐 Call your backend login endpoint
          const res = await api.post("/api/v1/auth/authenticate", {
            email: credentials?.email,
            password: credentials?.password,
          })
          console.log("🔐 Backend login response:", res)
          // const user = res.data?.user || res.data
          const token = res.data?.jwt
          const user = res.data?.user ?? res.data
          console.log("🔐 Backend login token:", token)
          console.log("🔐 Backend login user:", user)
          if (user) {
            // ✅ Return user data to NextAuth
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              token: res.data?.jwt, // store your backend JWT
            }
          }

          return null
        } catch (err: any) {
          console.error("❌ Auth error:", err)
          throw new Error("Invalid email or password")
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // When signing in, persist the backend JWT token
      if (user) {
        token.accessToken = user.token
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.token = token.accessToken
      return session
    },
  },
  pages: {
    signIn: "/", // stay on same page
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
