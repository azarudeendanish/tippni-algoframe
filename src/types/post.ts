// src/types/post.ts

export interface PostProfile {
    profileId: string;
    username: string;
    email?: string;
    avatarUrl?: string;
    followers?: number;
    followees?: number;
  }
  
  export interface Post {
    id: number;
    text: string;
    mediaUrls: string[];
    isLiked: boolean;
    likes: number;
    isBelongs: boolean;
    isRetippnied: boolean;
    replies: number;
    retippnis: number;
    replyTo: number | null;
    retippniTo: number | null;
    quoteTo: number | null;
    views: number;
    creationDate: string;
    profile: PostProfile;
  }
  