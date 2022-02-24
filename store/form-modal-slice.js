import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: { isOpen: false },
  reducers: {
    toggle(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggle } = formSlice.actions;
export default formSlice.reducer;
