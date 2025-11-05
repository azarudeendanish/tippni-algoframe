// ProfileInfo.tsx
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/axios"
import { MapPin, LinkIcon, Calendar } from "lucide-react"
import { useEffect, useState } from "react"

interface Profile {
  id: string
  name: string
  username: string
  bio?: string
  location?: string
  website?: string
  joinDate?: string
  followers?: number
  followees?: number
  avatarUrl?: string
}

export default function ProfileInfo() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYXphcmFsZ29mcmFtZUBnbWFpbC5jb20iLCJpYXQiOjE3NjIzMTg1MjMsImV4cCI6MTc2MjQwNDkyM30.R8qHwleE3e9gNLFc_gmZF6gOn1-R3VVqB14t14f6kXs"
        if (!token) {
          console.error("No token found")
          return
        }

        const res = await api.get("/api/v1/profiles/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setProfile(res.data.data || res.data) // supports both wrapped or direct response
      } catch (error) {
        console.error("Error fetching profile:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])
  if (loading) {
    return <div className="px-4 py-6 text-sm text-muted-foreground flex justify-center items-center">Loading profile...</div>
  }

  if (!profile) {
    return <div className="px-4 py-6 text-sm text-destructive">Failed to load profile.</div>
  }
  return (
    <div className="">
      <div className="px-4 py-4">
        {/* Avatar */}
        <div className="flex items-start justify-between -mt-16 mb-4">
          <Avatar className="size-32 border-4 border-background">
            <AvatarImage src={profile.avatarUrl || "/images/tippniLogo.jpg"} alt={profile.name} />
            <AvatarFallback>{profile.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <Button variant="outline" className="rounded-full bg-transparent">
            Follow
          </Button>
        </div>

        {/* Name and Handle */}
        <div className="mb-2">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-muted-foreground">@{profile.username}</p>
        </div>

        {profile.bio && (
          <p className="text-sm mb-4 leading-relaxed">{profile.bio}</p>
        )}

        {/* Info */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          {profile.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" aria-hidden />
              <span>{profile.location}</span>
            </div>
          )}
          {profile.website && 
            <div className="flex items-center gap-1">
              <LinkIcon className="size-4" aria-hidden />
              <a href="#" className="text-blue-500 hover:underline">
                {profile.website}
              </a>
            </div>
          }
          <div className="flex items-center gap-1">
            <Calendar className="size-4" aria-hidden />
            <span>Joined at {profile.joinDate}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 text-sm">
          <div>
            <span className="font-bold">{profile.followees}</span>
            <span className="text-muted-foreground ml-1">Following</span>
          </div>
          <div>
            <span className="font-bold">{profile.followers}</span>
            <span className="text-muted-foreground ml-1">Followers</span>
          </div>
        </div>
      </div>
    </div>
  )
}
