"use client"
import AvatarsRow from "@/components/feed/AvatarRow";
import PostCard from "@/components/feed/PostCard";
import SearchBar from "@/components/feed/SearchBar";
import LeftSidebar from "@/components/LeftSidebar";
import ProfilePage from "@/components/profile/ProfilePage";
import RightSidebar from "@/components/RightSidebar";
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import SettingsPage from "@/components/settings/SettingsPage";

export default function Home() {
  const activePage = useSelector((state: RootState) => state.page.activePage)
  return (
    <div className="min-h-dvh">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="sticky top-0 h-screen hidden md:block col-span-3 ">
            <LeftSidebar />
          </aside>

          {/* Feed */}
          <main className="col-span-12 md:col-span-6">
            <div className="">
            {/* <div className="sticky top-0 z-10 backdrop-blur"> */}
              <div className="py-3">
                <SearchBar />
                <div className="mt-3"><AvatarsRow /></div>
              </div>
            </div>
            <>
              {activePage === "home" && 
                <div className="py-4 space-y-6">
                  <PostCard
                    username="Alex Johnson"
                    handle="@alexj"
                    text="Just shipped a new design system update. Loving the consistency it brings!"
                    imageSrc="/images/webDeveloper.png"
                  />
                  <PostCard
                    username="Taylor Smith"
                    handle="@taywrites"
                    text="Writing is thinking. Draft often, publish when ready."
                    imageSrc="/images/minimal-desk-notebook.jpg"
                  />
                  <PostCard
                    username="Dev Collective"
                    handle="@devco"
                    text="Tip: Prefer semantic tokens over hard-coded colors for easier theming."
                    imageSrc="/images/design-system-presentation.png"
                  />
                </div>
              }
              {activePage === "profile" && <ProfilePage />}
              {activePage === "foryou" && <div>For You content here</div>}
              {activePage === "notification" && <div>Notifications here</div>}
              {activePage === "bookmarks" && <div>Bookmarks here</div>}
              {activePage === "settings" && <SettingsPage />}
            </>
          </main>

          {/* Right Sidebar */}
          <aside className="sticky top-0 h-screen hidden lg:block col-span-3">
            <RightSidebar />
          </aside>
        </div>
      </div>
    </div>
  )
}
