import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const RegulationSlice = createSlice({
  name: "regulation",
  initialState,
  reducers: {
    RegulationSelector(state, action) {
      return action.payload;
    },
  },
});

export const { RegulationSelector } = RegulationSlice.actions;
export default RegulationSlice.reducer;
