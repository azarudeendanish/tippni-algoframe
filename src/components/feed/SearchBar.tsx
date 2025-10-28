"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground rounded-xl"
        aria-hidden
        style={{color: '#436475'}}
      />
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <Input id="search" placeholder="Search" className="pl-11 rounded-full shadow-none border-none h-[51px]" style={{color: '#436475', backgroundColor: 'rgba(42, 163, 239, 0.04)'}} />
    </div>
  )
}
