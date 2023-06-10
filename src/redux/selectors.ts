import { RootState } from './store';

export const SelectFilter = (state: RootState) => state.filter;
export const SelectPizzas = (state: RootState) => state.pizza;
export const SelectCart = (state: RootState) => state.cart;
export const SelectCartById = (id: number) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
