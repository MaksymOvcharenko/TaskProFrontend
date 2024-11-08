import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
  name: "visibilitySideBar",
  initialState: { visibility: false },
  reducers: {
    openSideBar: (state) => {
      state.visibility = true;
    },
    closeSideBar: (state) => {
      state.visibility = false;
    },
    toggleSideBar: (state) => {
      state.visibility = !state.visibility;
    },
  },
});

export const { openSideBar, closeSideBar, toggleSideBar } =
  sideBarSlice.actions;
export default sideBarSlice.reducer;
