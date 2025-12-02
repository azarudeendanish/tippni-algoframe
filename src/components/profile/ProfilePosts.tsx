// src/components/profile/ProfilePosts.tsx
"use client"

import PostCard from "@/components/feed/PostCard"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { api } from "@/lib/axios"
import { RootState } from "@/store"
import { fetchUserPosts } from "@/store/postSlice"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "sonner"

interface ProfilePostsProps {
  tab: string
  profileId: string
}

export default function ProfilePosts({ tab, profileId }: ProfilePostsProps) {
  const dispatch = useAppDispatch()
  const { posts, loading } = useSelector((state: RootState) => state.post);
  
  useEffect(() => {
    if (profileId) dispatch(fetchUserPosts(profileId));
  }, [profileId, tab, dispatch]);

  if (loading) return <div className="py-10 text-center">Loading posts...</div>;

  if (posts.length === 0)
    return <div className="py-10 text-center text-muted-foreground">No posts found.</div>;

  // Filters
  let filtered = posts;

  if (tab === "media") filtered = posts.filter((p) => p.mediaUrls?.length > 0);
  if (tab === "replies") filtered = posts.filter((p) => p.replyTo !== null);
  if (tab === "likes") filtered = posts.filter((p) => p.isLiked);

  return (
    <div className="space-y-4 py-4">
      {filtered.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
