import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: true,
  data: [],
};
export const joySlice = createSlice({
  name: "joySlice",
  initialState,
  reducers: {
    loadJoy: (state, action) => {
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
export const { loadJoy, addJoy, deleteJoy } = joySlice.actions;
export default joySlice.reducer;
