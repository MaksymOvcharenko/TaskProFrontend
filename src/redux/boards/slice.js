import { createSlice } from "@reduxjs/toolkit";
import {  
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard,
} from "./operations";
import {  
  addColumn,
  updateColumn,
  deleteColumn,
} from '../сolumns/operations.js';
import {  
  addCard,
  updateCard,
  deleteCard,
  replaceCard,
} from '../cards/operations.js';
import { userCurrent } from "../auth/operations.js";

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    bordsTitle: [],
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
        state.bordsTitle = action.payload.boards;        
        state.loading = false;
      })
      .addCase(userCurrent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.boards;
      })
      .addCase(getBoardById.fulfilled, (state, action) => {
        const updatedBoard = action.payload.data.board;
        state.boards = state.boards.map((board) =>
        board._id === updatedBoard._id ? updatedBoard : board
        );        
       })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.bordsTitle.push(action.payload.data);
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.bordsTitle = state.bordsTitle.map((bordsTitle) =>
          bordsTitle.id === action.payload.id ? action.payload : bordsTitle
        );
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.bordsTitle = state.bordsTitle.filter(
          (board) => board.id !== action.meta.arg
        );
      })      
      .addCase(addColumn.fulfilled, (state, action) => {
       const { boardId, newColumn } = action.payload;
       const board = state.boards.find((board) => board._id === boardId);
         if (board) {
       board.columns.push(newColumn);
       }
        })
      .addCase(updateColumn.fulfilled, (state, action) => {
       const { boardId, updatedColumn } = action.payload;
       const board = state.boards.find((board) => board._id === boardId);
         if (board) {
       board.columns = board.columns.map((column) =>
      column._id === updatedColumn._id ? updatedColumn : column
       );
      }
      })
     .addCase(deleteColumn.fulfilled, (state, action) => {
     const { boardId, columnId } = action.payload;
     const board = state.boards.find((board) => board._id === boardId);
     if (board) {
       board.columns = board.columns.filter((column) => column._id !== columnId);
      }
     })       
      .addCase(addCard.fulfilled, (state, action) => {
     const { boardId, columnId, newCard } = action.payload;
     const board = state.boards.find((board) => board._id === boardId);
     const column = board?.columns.find((col) => col._id === columnId);
      if (column) {
    column.cards.push(newCard);
     }
    })
    .addCase(updateCard.fulfilled, (state, action) => {
    const { boardId, columnId, updatedCard } = action.payload;
    const board = state.boards.find((board) => board._id === boardId);
    const column = board?.columns.find((col) => col._id === columnId);
     if (column) {
     column.cards = column.cards.map((card) =>
     card._id === updatedCard._id ? updatedCard : card
     );
    }
   })
  .addCase(deleteCard.fulfilled, (state, action) => {
  const { boardId, columnId, cardId } = action.payload;
  const board = state.boards.find((board) => board._id === boardId);
  const column = board?.columns.find((col) => col._id === columnId);
  if (column) {
    column.cards = column.cards.filter((card) => card._id !== cardId);
  }
})
   .addCase(replaceCard.fulfilled, (state, action) => {
  const { boardId, columnId, replacedCard } = action.payload;
  const board = state.boards.find((board) => board._id === boardId);
  const column = board?.columns.find((col) => col._id === columnId);
  if (column) {
    column.cards = column.cards.map((card) =>
      card._id === replacedCard._id ? replacedCard : card
    );
  }
})
  },
});

export const boardsReducer = boardsSlice.reducer;
