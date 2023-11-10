import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  data: {
  }

};
export const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    loadAdmin: (state, action) => {
      return {
        ...initialState,
        data: action.payload,
        loading: false,
      };

      // fetch the api from action.payload and then

      // return {
      //   ...state,
      //   ,
      //   loading: false, // You might want to set loading to false when data is loaded
      // };
    },
    // deleteAdmin: (state,action)=> {
    // }
  },
});

export const { loadAdmin, deleteAdmin } = adminSlice.actions;
export default adminSlice.reducer;
