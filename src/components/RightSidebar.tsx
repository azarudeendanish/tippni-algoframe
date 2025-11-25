// src/components/RightSidebar.tsx

"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, LogOutIcon, Settings } from "lucide-react"
import Trending from "@/components/Trending"
import PopularUser from "@/components/PopularUser"
import LanguageSwitch from "./languageSelector/LanguageSwitch"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { signOut } from "next-auth/react"
import { toast } from "sonner"

const whoToFollow = [
  { name: "Jamie Lee", handle: "@jamie", initials: "JL" },
  { name: "Sam Rivera", handle: "@samr", initials: "SR" },
  { name: "Priya Mehta", handle: "@priyam", initials: "PM" },
]
interface RightSidebarProps {
  onSetSignup: (open: boolean) => void
}

export default function RightSidebar({onSetSignup}: RightSidebarProps) {
  // const profile = useSelector((state: RootState) => state.profile.data)
  // if(!profile) {
  //   return (
  //      <></>
  //   )
  // }
  // console.log('redux profile - rightsidebar => ', profile);
  
  return (
    <div className="flex h-[calc(100dvh-2rem)] flex-col gap-6">
      {/* <Card className="p-3 border-none shadow-none bg-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-9">
              <AvatarImage src={profile.avatarUrl || "/images/tippniLogo.jpg"} alt="Current user avatar" />
              <AvatarFallback>{profile.username.charAt(0).toUpperCase() || "T"}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="text-sm font-medium leading-none">{profile.username || "T"}</div>
              <div className="text-xs text-muted-foreground truncate">@{profile.username || "T"}</div>
            </div>
          </div>
          <LanguageSwitch />
          <Button variant="ghost" size="icon" aria-label="Settings" className="hidden">
            <Settings className="size-5" style={{color: '#436475'}} aria-hidden />
          </Button>
        </div>
      </Card> */}
      <div className="flex justify-between">
        <LanguageSwitch />
        <Button
          onClick={() => {
            signOut({ redirect: false }) // prevent full page reload
            toast.success("👋 Logged out successfully!")
            onSetSignup(true) // return to AuthContainer flow if needed
          }}
          className="w-fit rounded-full cursor-pointer p-2 bg-secondary text-muted-foreground border border-primary hover:bg-accent hover:text-gray-500 transition-all"
          size="sm"
        >
          <LogOut />
        </Button>
        
      </div>
      <Trending />
      <PopularUser />
    </div>
  )
}
