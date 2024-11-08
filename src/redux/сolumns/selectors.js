// Отримання всіх колонок
export const allColumnsByBoard = (state) => state.columns.columns;

export const loadingColumns = (state) => state.columns.loading;
// Отримання певної колонки за її _id
export const selectColumnById = (state, columnId) => {
  return state.columns.columns.find((column) => column._id === columnId);
};

// Отримання всіх карток в певній колонці за її _id
export const selectCardsInColumn = (state, columnId) => {
  const column = state.columns.columns.find(
    (column) => column._id === columnId
  );
  return column ? column.cards : []; // Повертає картки або порожній масив, якщо колонка не знайдена
};

// Отримання картки за її _id та id колонки
export const selectCardById = (state, columnId, cardId) => {
  const column = state.columns.columns.find(
    (column) => column._id === columnId
  );
  if (column) {
    return column.cards.find((card) => card._id === cardId);
  }
  return null; // Якщо колонка не знайдена або картка не знайдена
};

// Отримання всіх колонок для конкретної дошки
export const selectColumnsByBoardId = (state, boardId) => {
  return state.columns.columns.filter((column) => column.boardId === boardId);
};
