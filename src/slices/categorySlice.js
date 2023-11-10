import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: true,
  data: [],
};
export const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    loadCategory: (state, action) => {
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
export const { loadCategory } = categorySlice.actions;
export default categorySlice.reducer;
