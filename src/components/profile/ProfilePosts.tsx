"use client"

import PostCard from "@/components/feed/PostCard"

interface ProfilePostsProps {
  tab: string
}

export default function ProfilePosts({ tab }: ProfilePostsProps) {
  const posts = [
    {
      username: "Kew Coder",
      handle: "@kewcoder",
      text: "Just finished redesigning our design system. The new component library is going to make development so much faster!",
      imageSrc: "/images/design-system-presentation.png",
    },
    {
      username: "Kew Coder",
      handle: "@kewcoder",
      text: "Design tip: Always test your interfaces with real users. You'll be surprised what you learn!",
      imageSrc: "/images/minimal-desk-notebook.jpg",
    },
    {
      username: "Kew Coder",
      handle: "@kewcoder",
      text: "Just shipped a new design system update. Loving the consistency it brings!",
      imageSrc: "/images/webDeveloper.png",
    },
  ]

  const replies = [
    {
      username: "Kew Coder",
      handle: "@kewcoder",
      text: "Great point! I totally agree with your perspective on this.",
      imageSrc: undefined,
    },
    {
      username: "Kew Coder",
      handle: "@kewcoder",
      text: "Thanks for sharing this resource. Really helpful!",
      imageSrc: undefined,
    },
  ]

  const media = [
    {
      username: "Kew Coder",
      handle: "@kewcoder",
      text: "Behind the scenes of our design process",
      imageSrc: "/images/design-system-presentation.png",
    },
    {
      username: "Kew Coder",
      handle: "@kewcoder",
      text: "New workspace setup",
      imageSrc: "/images/minimal-desk-notebook.jpg",
    },
  ]

  const likes = [
    {
      username: "Kew Coder",
      handle: "@kewcoder",
      text: "Loved this article on design systems",
      imageSrc: "/images/code-editor-screenshot.png",
    },
  ]

  const getPostsForTab = () => {
    switch (tab) {
      case "replies":
        return replies
      case "media":
        return media
      case "likes":
        return likes
      default:
        return posts
    }
  }

  return (
    <div className="space-y-4 py-4">
      {getPostsForTab().map((post, index) => (
        <PostCard key={index} {...post} />
      ))}
    </div>
  )
}
