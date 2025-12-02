
// /src/components/homepage/HomePagePost.tsx
"use client"

import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { useEffect } from "react"
import PostCard from "../feed/PostCard"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { fetchHomeTimeline } from "@/store/timelineSlice"
import { Loader } from "../ui/loader"

const POST = [
    {
        id: 1,
        text:"Just shipped a new design system update. Loving the consistency it brings! Just shipped a new design system update. Loving the consistency it brings! Just shipped a new design system update. Loving the consistency it brings! Just shipped a new design system update. Loving the consistency it brings! Just shipped a new design system update. Loving the consistency it brings!",
        mediaUrls:["/images/webDeveloper.png"],
        profile: {
            bio: 'developer',
            email: 'alex@gmail.com',
            username: 'alexPandian',
            profileId: '007112223445',
            website: 'www.alex.com',
            location: 'findMe'
        }
    },
    {
        id: 2,
        text:"Tip: Prefer semantic tokens over hard-coded colors for easier theming.",
        imageUrl:"/images/design-system-presentation.png",
        profile: {
            bio: 'big developer',
            email: 'dev@gmail.com',
            username: 'devPandian',
            profileId: '007112223446',
            website: 'www.dev.com',
            location: 'findMeDev'
        }
    }
]

export default function HomePagePost() {
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(fetchHomeTimeline())
    }, [])

    const { posts, loading, error } = useSelector((state: RootState) => state.timeline)
    
  return (
    <>
        <div className="py-4 space-y-6">
            {loading && <div className="min-h-screen flex justify-center items-center -mt-20"><Loader /></div>}
            {!loading && posts.length === 0 && (
                POST.map((post) => (
                    <PostCard post={post} key={post.id} />
                ))
            )}

            {!loading && posts.length > 0 &&
                posts.map((post) => (
                    <PostCard post={post} key={post.id} />
                ))}
        </div>
    </>
  )
}
