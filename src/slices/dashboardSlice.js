import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: true,
  data: [],
};
export const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {
    loadDashboard: (state, action) => {
      // fetch the api from action.payload and then
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    },
  },
});

export const { loadDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
