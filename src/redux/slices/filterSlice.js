import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryID: 0,
  sort: {
    name: 'популярности возрастанию',
    sortProperty: 'rating',
  },
  page: 1,
  limit: 4,
  search: '',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryID: (state, action) => {
      state.categoryID = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    setSearchValue: (state, action) => {
      state.search = action.payload;
    },
    setFilters: (state, action) => {
      state.setCurrentPage = Number(action.payload.page);
      state.categoryID = Number(action.payload.categoryID);
      state.sort = action.payload.sort;
    },
  },
});

export const {
  setCategoryID,
  setSort,
  setCurrentPage,
  setSearchValue,
  setFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
