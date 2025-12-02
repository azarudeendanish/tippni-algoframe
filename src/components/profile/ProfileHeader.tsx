"use client"

import BackButton from "../ui/BackButton"

interface ProfileHeaderProps {
  username: string
}

export default function ProfileHeader({username}: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-2 py-3">
      <BackButton />
      <div>
        <h2 className="text-xl font-bold capitalize">{username}</h2>
        <p className="text-xs text-muted-foreground hidden">1,234 posts</p>
      </div>
    </div>
  )
}
