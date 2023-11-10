import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: true,
  data: [],
};
export const statementSlice = createSlice({
  name: "statementSlice",
  initialState,
  reducers: {
    loadStatement: (state, action) => {
      // fetch data using action.payload which contains the API
      return {
        ...initialState,
        data: action.payload,
        loading: false,
      };
    },
  },
});
export const { loadStatement } = statementSlice.actions;
export default statementSlice.reducer;
