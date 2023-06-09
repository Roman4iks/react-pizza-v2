import { SortPropertyEnum, Status } from './enums';

export type Pizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export type FetchPizzasArgs = {
  sortBy: Sort;
  searchValue: string;
  categoryID: number;
  limit: number;
  page: number;
};

export type CartItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

export interface FilterSliceState {
  searchValue: string;
  categoryID: number;
  sort: Sort;
  page: number;
  limit: number;
}

export interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  items: CartItem[];
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
