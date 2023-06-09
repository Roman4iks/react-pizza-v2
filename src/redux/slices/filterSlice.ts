import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryID: number;
  sort: Sort;
  page: number;
  limit: number;
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryID: 0,
  sort: {
    name: 'популярности возрастанию',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  page: 1,
  limit: 4,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryID: (state, action: PayloadAction<number>) => {
      state.categoryID = action.payload;
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      if (Object.keys(action.payload).length) {
        state.page = Number(action.payload.page);
        state.categoryID = Number(action.payload.categoryID);
        state.sort = action.payload.sort;
      } else {
        state.page = 1;
        state.categoryID = 0;
        state.sort = {
          name: 'популярности возрастанию',
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
        state.limit = 4;
        state.searchValue = '';
      }
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const {
  setCategoryID,
  setSort,
  setCurrentPage,
  setSearchValue,
  setFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
