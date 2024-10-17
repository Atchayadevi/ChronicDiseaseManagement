import { configureStore } from "@reduxjs/toolkit";
import RegulationReducer from "../Slices/RegulationSlice";
import YearReducer from "../Slices/YearSlice";
import SemesterSelector from "../Slices/SemesterSlice";
import DepSelector from "../Slices/DepSlice";
export const Store = configureStore({
  devTools: true,
  reducer: {
    Regulation: RegulationReducer,
    year: YearReducer,
    Sem: SemesterSelector,
    Dep: DepSelector,
  },
});
