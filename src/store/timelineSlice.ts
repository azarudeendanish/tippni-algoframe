import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";

export const fetchHomeTimeline = createAsyncThunk(
  "timeline/home",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/v1/timeline/home");
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch timeline");
    }
  }
);

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    posts: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeTimeline.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeTimeline.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchHomeTimeline.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default timelineSlice.reducer;
