
// /src/components/homepage/HomePage.tsx
"use client"

import { useSelector } from "react-redux"
import LeftSidebar from "../LeftSidebar"
import { RootState } from "@/store"
import { useEffect, useState } from "react"
import SearchBar from "../feed/SearchBar"
import AvatarsRow from "../feed/AvatarRow"
import ProfilePage from "../profile/ProfilePage"
import SettingsPage from "../settings/SettingsPage"
import RightSidebar from "../RightSidebar"
import MobileBottomNav from "../MobileBottomNav"
import { useSession } from "next-auth/react"
import { fetchCurrentUser } from "@/store/currentUserSlice"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { fetchHomeTimeline } from "@/store/timelineSlice"
import HomePagePost from "./HomePagePost"

export default function HomePage() {
    const dispatch = useAppDispatch()
    const { data: session, status } = useSession()
    
    useEffect(() => {
        if (session?.user.token && status === "authenticated") {
            dispatch(fetchCurrentUser())
            dispatch(fetchHomeTimeline())
        }
    }, [session, status])

    const activePage = useSelector((state: RootState) => state.page.activePage)
    const [signup, setSignup] = useState(true)

  return (
    <>
        <div className="grid grid-cols-12 gap-6 px-4 py-4">
            <aside className="sticky top-0 h-screen hidden md:block col-span-3 ">
            <LeftSidebar onSetSignup={setSignup} />
            </aside>
            <main className="col-span-12 md:col-span-6">
                <div className="">
                {/* <div className="sticky top-0 z-10 backdrop-blur"> */}
                    <div className="py-3">
                        <SearchBar />
                        <div className="mt-3 hidden"><AvatarsRow /></div>
                    </div>
                </div>
                {activePage === "home" && <HomePagePost /> }
                {activePage === "profile" && <ProfilePage />}
                {activePage === "foryou" && <div>For You content here</div>}
                {activePage === "notification" && <div>Notifications here</div>}
                {activePage === "bookmarks" && <div>Bookmarks here</div>}
                {activePage === "settings" && <SettingsPage />}
            </main>
            <aside className="sticky top-0 h-screen hidden lg:block col-span-3">
            <RightSidebar onSetSignup={setSignup} />
            </aside>
        </div>
        <MobileBottomNav />
    </>
  )
}
