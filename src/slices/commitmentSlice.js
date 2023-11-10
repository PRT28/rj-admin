import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: true,
  data: [],
};

export const commitmentSlice = createSlice({
  name: "commitmentSlice",
  initialState,
  reducers: {
    loadCommitment: (state, action) => {
      // fetch data using action.payload which contains the API
      return {
        ...initialState,
        data: action.payload,
        loading: false,
      };
      //state update
    },
  },
});

export const { loadCommitment, addCommitment, deleteCommitment } =
  commitmentSlice.actions;
export default commitmentSlice.reducer;
