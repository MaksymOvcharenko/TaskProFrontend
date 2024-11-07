import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/taskProApi';

// POST columns - Відправляє запит для створення нової колонки з даними, що передаються в параметрах.
export const addColumn = createAsyncThunk(
  'columns/addColumn',
  async (data, thunkAPI) => {
    try {
      const response = await taskProApi.post('/columns', data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// PUT columns/:id - Відправляє запит для оновлення колонки за її ID, передаючи нові дані.
export const updateColumn = createAsyncThunk(
  'columns/updateColumn',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await taskProApi.put(`/columns/${id}`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE columns/:id - Відправляє запит для видалення колонки за її ID.
export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async (id, thunkAPI) => {
    try {
      await taskProApi.delete(`/columns/${id}`);
      return id; // Повертаємо ID для видалення з локального стану
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
