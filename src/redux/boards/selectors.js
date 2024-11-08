// Селектор для отримання всіх бордів
export const selectBoards = (state) => state.boards.boards;

// Селектор для отримання статусу завантаження
export const selectLoading = (state) => state.boards.loading;

// Селектор для отримання повідомлення про помилку
export const selectError = (state) => state.boards.error;

