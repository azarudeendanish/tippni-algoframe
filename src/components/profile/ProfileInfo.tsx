"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MapPin, LinkIcon, Calendar } from "lucide-react"

export default function ProfileInfo() {
  return (
    <div className=" ">
      <div className="px-4 py-4">
        {/* Avatar */}
        <div className="flex items-start justify-between -mt-16 mb-4">
          <Avatar className="size-32 border-4 border-background">
            <AvatarImage src="/images/user-portrait-1.png" alt="Kew Coder" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <Button variant="outline" className="rounded-full bg-transparent">
            Follow
          </Button>
        </div>

        {/* Name and Handle */}
        <div className="mb-2">
          <h1 className="text-2xl font-bold">Kew Coder</h1>
          <p className="text-muted-foreground">@kewcoder</p>
        </div>

        {/* Bio */}
        <p className="text-sm mb-4 leading-relaxed">
          Product Designer | Coffee enthusiast ☕ | Building beautiful digital experiences
        </p>

        {/* Info */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="size-4" aria-hidden />
            <span>San Francisco, CA</span>
          </div>
          <div className="flex items-center gap-1">
            <LinkIcon className="size-4" aria-hidden />
            <a href="#" className="text-blue-500 hover:underline">
              kewcoder.com
            </a>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="size-4" aria-hidden />
            <span>Joined March 2020</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 text-sm">
          <div>
            <span className="font-bold">1.2K</span>
            <span className="text-muted-foreground ml-1">Following</span>
          </div>
          <div>
            <span className="font-bold">45.8K</span>
            <span className="text-muted-foreground ml-1">Followers</span>
          </div>
        </div>
      </div>
    </div>
  )
}
