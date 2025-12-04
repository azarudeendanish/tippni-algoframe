import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";

export const toggleRepost = createAsyncThunk(
  "repost/toggleRepost",
  async ({ postId, isReposted }: { postId: number; isReposted: boolean }, { rejectWithValue }) => {
    try {
      if (isReposted) {
        // UNDO REPOST
        const res = await api.delete(`/api/v1/retippni/${postId}`);
        return { postId, type: "undo" };
      }

      // CREATE REPOST
      const res = await api.post(`/api/v1/retippni/${postId}`);
      return { postId, type: "create", data: res.data };
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || "Repost failed");
    }
  }
);

const repostSlice = createSlice({
  name: "repost",
  initialState: { loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleRepost.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleRepost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleRepost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default repostSlice.reducer;
