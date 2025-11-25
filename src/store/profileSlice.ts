// src/store/profileSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "@/lib/axios"

export interface ProfileState {
  data: any | null
  loading: boolean
  error: string | null
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null
}

export const fetchMyProfile = createAsyncThunk(
  "profile/fetchMyProfile",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/v1/profiles/me")
      return res.data.data || res.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      )
    }
  }
)

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.data = null
      state.loading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMyProfile.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchMyProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearProfile } = profileSlice.actions
export default profileSlice.reducer