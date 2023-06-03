import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'популярности убыванию',
  sortProperty: 'rating',
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.name = action.payload.name;
      state.sortProperty = action.payload.sortProperty;
    },
  },
});

export const { setSort } = sortSlice.actions;
export default sortSlice.reducer;
