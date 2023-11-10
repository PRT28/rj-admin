import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  data: [],
};

export const puzzleSlice = createSlice({
  name: "puzzleSlice",
  initialState,
  reducers: {
    loadPuzzle: (state, action) => {
      // store data using action.payload which contains the API
      //state update
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    },
    editPuzzle: (state, action) => {
      const { updatedData,index } = action.payload
      const newData = [...state.data];
      newData[index] = { ...newData[index], ...updatedData };
      console.log("redux state of puzzle is",newData)
      return {
        ...state,
        data: newData,
        loading: false
      }
    }
  },
});

export const { loadPuzzle, editPuzzle, deletePuzzle } = puzzleSlice.actions;
export default puzzleSlice.reducer;
