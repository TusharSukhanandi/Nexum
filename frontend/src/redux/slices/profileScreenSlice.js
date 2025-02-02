import { createSlice } from "@reduxjs/toolkit";

export const profileScreenSlice = createSlice({
  name: "profileScreen",
  initialState: false,
  reducers: {
    showProfileScreen: (state) => true, 
    hideProfileScreen: (state) => false, 
    toggleProfileScreen : (state) => !state,
  },
});

export const { showProfileScreen, hideProfileScreen, toggleProfileScreen } = profileScreenSlice.actions;
export default profileScreenSlice.reducer;  