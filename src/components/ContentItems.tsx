import { useSelector } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import qs from 'qs';

import { PizzaBlock } from './PizzaBlock';
import PizzaBlockSkeleton from './skeletons/PizzaBlockSkeleton';

import { sorting } from './Sort';
import {
  FetchPizzasArgs,
  SelectPizzas,
  Status,
  fetchPizzas,
} from '../redux/slices/pizzaSlice';
import {
  FilterSliceState,
  selectFilter,
  setFilters,
} from '../redux/slices/filterSlice';
import { useIsMounted } from '../hooks/useIsMounted';
import { useAppDispatch } from '../redux/store';

export const ContentItems = () => {
  const { categoryID, sort, page, limit, searchValue }: FilterSliceState =
    useSelector(selectFilter);

  const { items, status } = useSelector(SelectPizzas);

  const isSearch = useRef(false);
  const isMounted = useIsMounted();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getPizzas = useCallback(async () => {
    if (!isSearch.current) {
      await dispatch(
        fetchPizzas({
          categoryID,
          sortBy: sort,
          page,
          limit,
          searchValue,
        })
      );
    }
    window.scrollTo(0, 0);
  }, [dispatch, categoryID, sort, page, limit, searchValue]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as FetchPizzasArgs;

      const sort = sorting.find(
        (obj) => obj.sortProperty === params.sortBy.sortProperty
      );

      if (sort) {
        params.sortBy = sort;
      }

      dispatch(
        setFilters({
          searchValue: params.searchValue,
          categoryID: Number(params.categoryID),
          page: Number(params.page),
          limit: Number(params.limit),
          sort: sort || sorting[0],
        })
      );

      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    getPizzas();
  }, [getPizzas]);

  useEffect(() => {
    if (isMounted.current) {
      return;
    }

    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryID,
      page,
    });

    navigate(`?${queryString}`);

    if (!window.location.search) {
      dispatch(fetchPizzas({} as FetchPizzasArgs));
    }
  }, [
    categoryID,
    sort.sortProperty,
    searchValue,
    page,
    isMounted,
    navigate,
    dispatch,
  ]);

  if (status === Status.ERROR) {
    return (
      <>
        <h2>Произошла ошибка соединения</h2>
      </>
    );
  }

  return (
    <>
      <h2 className="content__title">
        {status === Status.LOADING ? 'Загрузка ...' : 'Все пиццы'}
      </h2>
      <div className="content__items">
        {status === Status.LOADING
          ? [...new Array(6)].map((_, index) => (
              <PizzaBlockSkeleton key={index} />
            ))
          : items.map((item) => <PizzaBlock {...item} id={item.id} />)}
      </div>
    </>
  );
};
