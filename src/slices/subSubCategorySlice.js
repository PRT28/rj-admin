import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: true,
  data: [],
};
export const subSubCategorySlice = createSlice({
  name: "subSubCategorySlice",
  initialState,
  reducers: {
    loadSubSubCategory: (state, action) => {
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
export const { loadCategory } = subSubCategorySlice.action;
export default subSubCategorySlice.reducer;
