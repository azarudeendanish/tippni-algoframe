// src/store/index.ts

import { configureStore } from "@reduxjs/toolkit"
import pageReducer from "./pageSlice"
import profileReducer from "@/store/profileSlice"
import currentUserReducer from "@/store/currentUserSlice"
import timelineReducer from "@/store/timelineSlice"
import postReducer from "@/store/postSlice"
import repostReducer from "@/store/repostSlice"

export const store = configureStore({
  reducer: {
    page: pageReducer,
    profile: profileReducer,
    currentUser: currentUserReducer,
    timeline: timelineReducer,
    post: postReducer,
    repost: repostReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch