"use client"
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import ProfileTabs from "./ProfileTabs";
import ProfilePosts from "./ProfilePosts";
import { useState } from "react";
import Image from "next/image";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("posts")
    return(
        <main className="col-span-12 lg:col-span-6">
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
              <ProfileHeader />
            </div>

            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
              <Image width={100} height={100} src="/images/twitter-profile-cover.jpg" alt="Profile cover" className="w-full h-full object-cover" />
              {/* <img src="/images/twitter-profile-cover.jpg" alt="Profile cover" className="w-full h-full object-cover" /> */}
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