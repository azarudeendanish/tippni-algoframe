// src/store/index.ts

import { configureStore } from "@reduxjs/toolkit"
import pageReducer from "./pageSlice"
import profileReducer from "@/store/profileSlice"

export const store = configureStore({
  reducer: {
    page: pageReducer,
    profile: profileReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch