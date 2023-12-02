import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: true,
  data: [],
};
export const subCategorySlice = createSlice({
  name: "subCategorySlice",
  initialState,
  reducers: {
    loadSubCategory: (state, action) => {
      // fetch data using action.payload which contains the API
      //state update
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    },
  },
});
export const { loadSubCategory } = subCategorySlice.actions;
export default subCategorySlice.reducer;
