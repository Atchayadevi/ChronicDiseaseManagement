import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
const DepSlice = createSlice({
  name: "Department",
  initialState,
  reducers: {
    DepSelector(state, action) {
      return action.payload;
    },
  },
});

export const { DepSelector } = DepSlice.actions;
export default DepSlice.reducer;
