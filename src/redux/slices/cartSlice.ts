import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem, CartSliceState } from '../../@types/index';

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
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

    removeItem: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        state.totalPrice = state.totalPrice - findItem.price * findItem.count;
        state.totalCount = state.totalCount - findItem.count;
        state.items = state.items.filter((obj) => obj.id !== action.payload);
      }
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

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
