import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  index: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setIndex: (state, action) => {
      state.index = action.payload;
    },
  },
});

export const { setIndex } = filterSlice.actions;
export default filterSlice.reducer;
