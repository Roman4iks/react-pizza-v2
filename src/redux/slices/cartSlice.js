import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);

      state.totalCount = state.items.reduce((count, item) => {
        return count + item.count;
      }, 0);
    },
    removeItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      state.totalPrice = state.totalPrice - findItem.price * findItem.count;
      state.totalCount = state.totalCount - findItem.count;
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    minusItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        if (findItem.count === 1) {
          state.items = state.items.filter((obj) => obj.id !== action.payload);
        } else {
          findItem.count--;
        }
        state.totalCount -= 1;
        state.totalPrice = state.totalPrice - findItem.price;
      }
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartById = (id) => (state) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
