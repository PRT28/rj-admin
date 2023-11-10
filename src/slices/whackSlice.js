import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: true,
  data: [],
};
export const whackSlice = createSlice({
  name: "whackSlice",
  initialState,
  reducers: {
    loadWhack: (state, action) => {
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
export const { loadWhack, addWhack, deleteWhack } = whackSlice.actions;
export default whackSlice.reducer;
