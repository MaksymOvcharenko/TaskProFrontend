import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/tastProApi';

// GET columns
export const getColumns = createAsyncThunk(
  'columns/getColumns',
  async (_, thunkAPI) => {
    try {
      const response = await taskProApi.get('/columns');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// POST columns
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

// PUT columns/:id
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

// DELETE columns/:id
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
