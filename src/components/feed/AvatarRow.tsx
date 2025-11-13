"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus } from "lucide-react"

const profiles = [
  { alt: "User 1", src: "/images/user-portrait-1.png", initials: "AJ" },
  { alt: "User 2", src: "/images/user-portrait-2.png", initials: "TS" },
  { alt: "User 3", src: "/images/user-portrait-3.png", initials: "DC" },
  { alt: "User 4", src: "/images/user-portrait-4.png", initials: "LM" },
  { alt: "User 5", src: "/images/user-portrait-5.png", initials: "RS" },
  { alt: "User 6", src: "/images/user-portrait-6.png", initials: "KB" },
  { alt: "User 7", src: "/images/user-portrait-7.png", initials: "PM" },
]

export default function AvatarsRow() {
  return (
    <div className="flex items-center justify-start gap-4">  
    {/* dont need flex wrap, but hide from last when screen resize */}
      <div className="flex flex-col items-center shrink-0">
        <div className="relative flex justify-center items-center size-8 shrink-0 overflow-hidden rounded-full" style={{background: '#426374', height: '48px', width: '48px'}}>
          <Plus className="w-4 rounded-full size-4 bg-accent text-bold " style={{color: '#426374'}} />
        </div>
      </div>
      <div className="flex items-center justify-start gap-4 pb-1 pt-1 overflow-x-auto scrollbar-hide whitespace-nowrap">
        {profiles.map((p, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <Avatar className="size-12 ring-1 ring-border">
              <AvatarImage src={p.src || "/placeholder.svg"} alt={p.alt} />
              <AvatarFallback>{p.initials}</AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>
    </div>
  )
}
