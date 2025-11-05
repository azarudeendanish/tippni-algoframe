"use client"
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import ProfileTabs from "./ProfileTabs";
import ProfilePosts from "./ProfilePosts";
import { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Profile {
  id: string
  name: string
  username: string
  bio?: string
  location?: string
  website?: string
  joinedDate?: string
  followersCount?: number
  followingCount?: number
  avatarUrl?: string
  bannerUrl?: string
}

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("posts")
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYXphcmFsZ29mcmFtZUBnbWFpbC5jb20iLCJpYXQiOjE3NjIzMTg1MjMsImV4cCI6MTc2MjQwNDkyM30.R8qHwleE3e9gNLFc_gmZF6gOn1-R3VVqB14t14f6kXs"
          if (!token) {
            console.error("No token found")
            toast.error('No token found')
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
    console.log('profile', profile);
    
    return(
      <main className="col-span-12 lg:col-span-6">
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <ProfileHeader username={profile.username} />
          </div>

          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden hidden">
            <Image width={100} height={100} src="/images/twitter-profile-cover.jpg" alt="Profile cover" className="w-full h-full object-cover" />
          </div>
          <div className="h-48 bg-gradient-to-r bg-accent overflow-hidden">
            <Avatar className="w-full h-full object-cover">
              <AvatarImage src={profile?.bannerUrl} alt={profile.name} />
              <AvatarFallback>{"No Banner"}</AvatarFallback>
            </Avatar>
          </div>

          {/* Profile Info */}
          <ProfileInfo />

          {/* Tabs */}
          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Posts */}
          <ProfilePosts tab={activeTab} />
        </main>
    )
}