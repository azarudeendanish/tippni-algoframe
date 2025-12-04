// src/store/postSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";
import { Post } from "@/types/post";

export const createTippniPost = createAsyncThunk(
  "post/createTippniPost",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/v1/tippni", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to post Tippni"
      );
    }
  }
);


export const fetchUserPosts = createAsyncThunk(
    "post/fetchUserPosts",
    async (profileId: string, { rejectWithValue }) => {
      try {
        const res = await api.get(`/api/v1/tippnis/user/${profileId}`);
        return res.data as Post[];  // typed
      } catch (error: any) {
        return rejectWithValue(error?.response?.data?.message || "Failed to load posts");
      }
    }
  );
  
  

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId: number, { rejectWithValue }) => {
    try {
      await api.delete(`/api/v1/tippni/${postId}`);
      return postId; // return ID so UI can remove it
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to delete post");
    }
  }
);

interface PostState {
    posts: Post[];
    loading: boolean;
    deleting: boolean;
    error: string | null;
    deleteError: string | null;
}
  
const initialState: PostState = {
    posts: [],
    loading: false,
    deleting: false,
    error: null,
    deleteError: null,
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
      clearPosts: (state) => {
        state.posts = [];
        state.error = null;
      },
    },
  extraReducers: (builder) => {
    builder
    /* ---------------- FETCH POSTS ---------------- */
    .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload; // set posts
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      /* ---------------- CREATE POST ---------------- */
      .addCase(createTippniPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTippniPost.fulfilled, (state, action) => {
        state.loading = false;
      
        // Prepend new post into feed
        state.posts.unshift(action.payload);
      })
      .addCase(createTippniPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      /* ---------------- DELETE POST ---------------- */
      .addCase(deletePost.pending, (state) => {
        state.deleting = true;
        state.deleteError = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deleting = false;
        // REMOVE THE POST FROM UI
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.deleting = false;
        state.deleteError = action.payload as string;
      });
  },
});

export const { clearPosts } = postSlice.actions;
export default postSlice.reducer;
