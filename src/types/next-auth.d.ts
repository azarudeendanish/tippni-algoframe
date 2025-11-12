import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

// Extend the default `Session` and `User` types
declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      token?: string | null
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id?: string
    token?: string | null
  }
}

// Extend the default `JWT` token type
declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    accessToken?: string | null
  }
}
