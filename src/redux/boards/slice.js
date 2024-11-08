import { createSlice } from "@reduxjs/toolkit";
import { addBoard, updateBoard, deleteBoard } from "./operations";
import { userCurrent } from "../auth/operations.js";

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userCurrent.pending, (state) => {
        state.loading = true;
      })
      .addCase(userCurrent.fulfilled, (state, action) => {
        state.boards = action.payload.boards;
        state.loading = false;
      })
      .addCase(userCurrent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.boards;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload.data);
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.boards = state.boards.map((board) =>
          board.id === action.payload.id ? action.payload : board
        );
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter(
          (board) => board.id !== action.meta.arg
        );
      });
  },
});

export const boardsReducer = boardsSlice.reducer;
