// ID	Image	Name	Email	Zip Code	Genere	role	Modified By	Modified On	Abuse	Disable/ Enable	Action
import { createSlice } from "@reduxjs/toolkit";
const initialState = [
  {
    loading: true,
    data: [],
  },
];
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
      // fetch the api from action.payload and then
    },
    // deleteUser: (state,action)=> {
    // }
  },
});

export const { loadUser } = userSlice.actions;
export default userSlice.reducer;
