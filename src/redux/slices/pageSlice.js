import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: 1,
  limit: 4,
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.current = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

export const { setPage, setLimit } = pageSlice.actions;
export default pageSlice.reducer;
