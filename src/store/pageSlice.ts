import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Page = "home" | "foryou" | "notification" | "bookmarks" | "profile" | "settings"

interface PageState {
  activePage: Page
}

const initialState: PageState = {
  activePage: "home",
}

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<Page>) => {
      state.activePage = action.payload
    },
  },
})

export const { setPage } = pageSlice.actions
export default pageSlice.reducer
