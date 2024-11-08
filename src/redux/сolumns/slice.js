import { createSlice } from "@reduxjs/toolkit";

import {
  addColumn,
  updateColumn,
  deleteColumn,
  getBoardById,
} from "../сolumns/operations.js";
import {
  addCard,
  updateCard,
  deleteCard,
  replaceCard,
} from "../cards/operations.js";

const columnsSlice = createSlice({
  name: "columns",
  initialState: {
    columns: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обробка отримання даних про дошку з колонками та картками
      .addCase(getBoardById.fulfilled, (state, action) => {
        const { columnsAll } = action.payload.data;

        // Оновлюємо стан колонок, отриманих з відповіді сервера
        state.columns = columnsAll.map((column) => ({
          ...column, // зберігаємо всі дані колонки
          cards: column.cards || [], // додаємо картки в колонку, якщо вони є
        }));
      })

      // Додавання нової колонки

      .addCase(addColumn.fulfilled, (state, action) => {
        const newColumn = {
          ...action.payload.data, // данные колонки с сервера
          cards: [], // добавляем пустой массив `cards` только в Redux
        };
        state.columns.push(newColumn);
        // Додаємо нову колонку
      })

      // Оновлення колонки
      .addCase(updateColumn.fulfilled, (state, action) => {
        state.columns = state.columns.map((column) =>
          column._id === action.payload._id ? action.payload : column
        );
      })

      // Видалення колонки
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.columns = state.columns.filter(
          (column) => column._id !== action.payload
        );
      })

      // Додавання картки
      .addCase(addCard.fulfilled, (state, action) => {
        const column = state.columns.find(
          (col) => col._id === action.payload.data.columnId
        );
        if (column) {
          column.cards.push(action.payload.data); // Додаємо картку в колонку
        }
      })

      // Оновлення картки
      .addCase(updateCard.fulfilled, (state, action) => {
        const column = state.columns.find(
          (col) => col._id === action.payload.columnId
        );
        if (column) {
          column.cards = column.cards.map((card) =>
            card._id === action.payload._id ? action.payload : card
          );
        }
      })

      // Видалення картки
      .addCase(deleteCard.fulfilled, (state, action) => {
        const column = state.columns.find(
          (col) => col._id === action.payload.columnId
        );
        if (column) {
          column.cards = column.cards.filter(
            (card) => card._id !== action.payload._id
          );
        }
      })

      // Переміщення картки
      .addCase(replaceCard.fulfilled, (state, action) => {
        const column = state.columns.find(
          (col) => col._id === action.payload.columnId
        );
        if (column) {
          column.cards = column.cards.map((card) =>
            card._id === action.payload._id ? action.payload : card
          );
        }
      });
  },
});

export const columnsReducer = columnsSlice.reducer;
