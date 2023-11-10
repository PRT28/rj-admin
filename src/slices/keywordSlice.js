import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: true,
  data: [],
};
export const keywordSlice = createSlice({
  name: "keywordSlice",
  initialState,
  reducers: {
    loadKeyword: (state, action) => {
      return {
        ...initialState,
        data: action.payload,
        loading: false,
      };
    },
  },
});
export const { loadKeyword, addKeyword, deleteKeyword } = keywordSlice.actions;
export default keywordSlice.reducer;
