"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProfileTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  return (
    <div className="">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b border-gray-300 bg-transparent p-0 h-auto">
          <TabsTrigger
            value="posts"
            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-b-blue-500 data-[state=active]:bg-transparent"
          >
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="replies"
            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-b-blue-500 data-[state=active]:bg-transparent"
          >
            Replies
          </TabsTrigger>
          <TabsTrigger
            value="media"
            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-b-blue-500 data-[state=active]:bg-transparent"
          >
            Media
          </TabsTrigger>
          <TabsTrigger
            value="likes"
            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-b-blue-500 data-[state=active]:bg-transparent"
          >
            Likes
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
