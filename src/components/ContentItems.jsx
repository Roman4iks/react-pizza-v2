import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import qs from 'qs';

import { PizzaBlock } from './PizzaBlock';
import PizzaBlockSkeleton from './skeletons/PizzaBlockSkeleton';

import { sorting } from './Sort';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { selectFilter, setFilters } from '../redux/slices/filterSlice';

export function ContentItems() {
  const { categoryID, sort, page, limit, searchValue } =
    useSelector(selectFilter);

  const { items, status, messageError } = useSelector((state) => state.pizza);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPizzas = useCallback(async () => {
    if (!isSearch.current) {
      dispatch(
        fetchPizzas({
          categoryID,
          sort,
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
      const params = qs.parse(window.location.search.substring(1));

      const sort = sorting.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      const setSort = (sort) => {
        dispatch(
          setFilters({
            ...params,
            sort,
          })
        );
      };

      setSort(sort);

      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    getPizzas();
  }, [getPizzas]);

  useEffect(() => {
    if (isMounted.current) {
      // FIX base url page
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryID,
        page,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sort, categoryID, page, limit, searchValue, navigate]);

  if (status === 'error') {
    return (
      <>
        <h2>Произошла ошибка соединения</h2>
        <p>
          {messageError} {/* FIX not working link */}
          <Link to="/" className="button">
            главную страницу
          </Link>
        </p>
      </>
    );
  }

  return (
    <>
      <h2 className="content__title">
        {status === 'loading' ? 'Загрузка ...' : 'Все пиццы'}
      </h2>
      <div className="content__items">
        {status === 'loading'
          ? [...new Array(6)].map((_, index) => (
              <PizzaBlockSkeleton key={index} />
            ))
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </>
  );
}
