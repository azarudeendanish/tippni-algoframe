// src/store/currentUserSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";

export interface CurrentUser {
  profileId: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bannerUrl?: string;
  bio?: string;
  birthDate?: string;
  followers?: number;
  followees?: number;
  joinDate?: string;
  location?: string;
  website?: string;
}
interface CurrentUserState {
  user: CurrentUser | null;
  loading: boolean;
}

const initialState: CurrentUserState = {
  user: null,
  loading: false,
};
export const fetchCurrentUser = createAsyncThunk(
  "currentUser/fetch",
  async () => {
    const res = await api.get("/api/v1/profiles/me");
    return res.data.data || res.data; // your backend structure
  }
);

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default currentUserSlice.reducer;