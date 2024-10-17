import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const YearSlice = createSlice({
  name: "Year",
  initialState,
  reducers: {
    YearSelector(state, action) {
      return action.payload;
    },
  },
});

export const { YearSelector } = YearSlice.actions;
export default YearSlice.reducer;
