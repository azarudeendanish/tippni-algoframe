"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { TrendingUp } from "lucide-react"

export default function PopularUser() {

    const whoToFollow = [
        { name: "1. Kew coder", handle: "@kewcoder", initials: "KC" },
        { name: "2. Kew coder2", handle: "@kewcoder2", initials: "KC" },
        { name: "3. Kew coder3", handle: "@kewcode3", initials: "KC" },
      ]
    return(
        <>
            <Card className="border-none gap-1 bg-secondary">
                <div className="px-4 py-1 flex justify-between text-accent">
                    <div className="flex gap-2 ">
                        <h3 className="text-sm font-semibold truncate">Popular User</h3>
                        <TrendingUp />
                    </div>
                    <div className="text-xs">Today</div>
                </div>
                <ul className="">
                {whoToFollow.map((p) => (
                    <li key={p.handle} className="flex items-center justify-between gap-3 px-4 py-3">
                        <div className="flex min-w-0 items-center gap-3">
                            {/* <Avatar className="size-9 hidden">
                                <AvatarImage src="/popular-user-avatar.jpg" alt={`${p.name} avatar`} />
                                <AvatarFallback>{p.initials}</AvatarFallback>
                            </Avatar> */}
                            <div className="min-w-0">
                            <div className="truncate text-sm font-medium leading-none">{p.name}</div>
                            <div className="truncate text-xs text-muted-foreground hidden">{p.handle}</div>
                            </div>
                        </div>
                        <div className="flex justify-between gap-2">
                            <div className="truncate text-xs text-muted-foreground">15k Like</div>
                            <div className="truncate text-xs text-accent cursor-pointer hover:underline">Follow</div>
                            <button className="text-sm text-primary cursor-pointer hover:underline hidden" aria-label="Follow">
                                Follow
                            </button>
                        </div>
                    {/* <Button size="sm" variant="link" className="shrink-0 ">
                        Follow
                    </Button> */}
                    </li>
                ))}
                </ul>
            </Card>
        </>
    )
}