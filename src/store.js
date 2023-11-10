import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlice";
import userReducer from "./slices/userSlice";
import keywordReducer from "./slices/keywordSlice";
import joyReducer from "./slices/joySlice";
import puzzleReducer from "./slices/puzzleSlice";
import categoryReducer from "./slices/categorySlice";
import adminReducer from "./slices/adminSlice";
import whackReducer from "./slices/whackSlice";
import commitmentReducer from "./slices/commitmentSlice";
import statementReducer from "./slices/statementSlice";
import reportReducer from "./slices/reportSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    dashboard: dashboardReducer,
    user: userReducer,
    keyword: keywordReducer,
    joy: joyReducer,
    whack: whackReducer,
    puzzle: puzzleReducer,
    category: categoryReducer,
    commitment: commitmentReducer,
    statement: statementReducer,
    report: reportReducer,
  },
});
