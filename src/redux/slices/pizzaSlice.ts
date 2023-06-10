import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchPizzasArgs, Pizza } from '../../@types';
import { Status } from '../../@types/enums';

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  'pizza/fetchPizzas',
  async ({ sortBy, searchValue, categoryID, limit, page }, thunkApi) => {
    const response = await axios.get<Pizza[]>(
      `https://64762957e607ba4797dd62ed.mockapi.io/pizza/items`,
      {
        params: {
          ...(sortBy && {
            sortBy: sortBy.sortProperty.replace('-', ''),
            order: sortBy.sortProperty.includes('-') ? 'asc' : 'desc',
          }),
          ...(searchValue && { search: searchValue }),
          ...(categoryID !== 0 && { category: categoryID }),
          ...(limit && { limit: limit }),
          ...(page && { page: page }),
        },
      }
    );
    if (response.data.length === 0) {
      return thunkApi.rejectWithValue('Пицц не найдено');
    }
    return thunkApi.fulfillWithValue(response.data);
  }
);

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
