"use client"

import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { useState, useEffect } from "react"
import { SearchResultsDropdown } from "./SearchResultsDropdown"

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches")
    if (stored) {
      setRecentSearches(JSON.parse(stored))
    }
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      // Add to recent searches
      const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem("recentSearches", JSON.stringify(updated))
    }
    setIsOpen(true)
  }

  const handleClear = () => {
    setSearchQuery("")
    setIsOpen(false)
  }
  return (
    <>
      <div className="relative">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <div className="relative">
        <Input
          id="search"
          placeholder="Search"
          className="pl-11 rounded-full shadow-none border-none h-[51px]" style={{color: '#436475', backgroundColor: 'rgba(42, 163, 239, 0.04)'}}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <SearchResultsDropdown
          searchQuery={searchQuery}
          recentSearches={recentSearches}
          onClose={() => setIsOpen(false)}
          onSelectSearch={(query) => {
            setSearchQuery(query)
            handleSearch(query)
          }}
        />
      )}
    </div>
    </>
    // <div className="relative">
    //   <Search
    //     className="pointer-events-none absolute left-5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground rounded-xl"
    //     aria-hidden
    //     style={{color: '#436475'}}
    //   />
    //   <label className="sr-only" htmlFor="search">
    //     Search
    //   </label>
    //   <Input id="search" placeholder="Search" className="pl-11 rounded-full shadow-none border-none h-[51px]" style={{color: '#436475', backgroundColor: 'rgba(42, 163, 239, 0.04)'}} />
    // </div>
  )
}
