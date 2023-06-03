import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import sortSlice from './slices/sortSlice';
import pageSlice from './slices/pageSlice';
import searchSlice from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    sort: sortSlice,
    page: pageSlice,
    search: searchSlice,
  },
});
