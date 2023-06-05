import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({ sort, searchValue, categoryID, limit, page }) => {
    const response = await axios.get(
      `https://64762957e607ba4797dd62ed.mockapi.io/pizza/items`,
      {
        params: {
          ...(sort && {
            sortBy: sort.sortProperty.replace('-', ''),
            order: sort.sortProperty.includes('-') ? 'asc' : 'desc',
          }),
          ...(searchValue && { search: searchValue }),
          ...(categoryID !== 0 && { category: categoryID }),
          ...(limit && { limit: limit }),
          ...(page && { page: page }),
        },
      }
    );
    return response.data;
  }
);

const initialState = {
  items: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
