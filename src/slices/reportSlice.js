import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: true,
  data: [
    // {
    //   report_text: "Report 1",
    //   asset_id: "0932809q58305982013",
    // },
    // {
    //   report_text: "Report 2",
    //   asset_id: "0932809q58305982013",
    // },
  ],
};
export const reportSlice = createSlice({
  name: "reportSlice",
  initialState,
  reducers: {
    loadReport: (state, action) => {
      // fetch data using action.payload which contains the API
      //state update
      return {
        ...initialState,
        data: action.payload,
        loading: false,
      };
    },
  },
});
export const { loadReport } = reportSlice.actions;
export default reportSlice.reducer;
