import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import qs from 'qs';

import { PizzaBlock } from './PizzaBlock';
import PizzaBlockSkeleton from './skeletons/PizzaBlockSkeleton';

import { sorting } from './Sort';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { selectFilter, setFilters } from '../redux/slices/filterSlice';
import { useIsMounted } from '../hooks/useIsMounted';

type ContentProps = {
  categoryID: number;
  sort: any;
  page: number;
  limit: number;
  searchValue: string;
};

type ItemProps = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

type ItemStatus = {
  items: ItemProps[];
  status: string;
  messageError: string;
};

export const ContentItems = () => {
  const { categoryID, sort, page, limit, searchValue }: ContentProps =
    useSelector(selectFilter);

  const { items, status, messageError }: ItemStatus = useSelector(
    (state: any) => state.pizza
  );

  const isSearch = useRef(false);
  const isMounted = useIsMounted();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPizzas = useCallback(async () => {
    if (!isSearch.current) {
      await dispatch(
        // @ts-ignore
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

      const setSort = (sort: any) => {
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
      return;
    }

    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryID,
      page,
    });

    navigate(`?${queryString}`);
  }, [isMounted, sort, page, categoryID, navigate]);

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
          : items.map((item) => (
              <Link key={item.id} to={`/pizza/${item.id}`}>
                {' '}
                <PizzaBlock {...item} id={parseInt(item.id)} />{' '}
              </Link>
            ))}
      </div>
    </>
  );
};
