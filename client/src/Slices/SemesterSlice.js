import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
const SemesterSlice = createSlice({
  name: "Semester",
  initialState,
  reducers: {
    SemesterSelector(state, action) {
      return action.payload;
    },
  },
});

export const { SemesterSelector } = SemesterSlice.actions;
export default SemesterSlice.reducer;
