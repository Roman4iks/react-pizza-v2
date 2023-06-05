import { useEffect, useRef } from 'react';
import { PizzaBlock } from './PizzaBlock';
import PizzaBlockSkeleton from './skeletons/PizzaBlockSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../redux/slices/filterSlice';
import { sorting } from './Sort';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

export function ContentItems() {
  const categoryID = useSelector((state) => state.filter.categoryID);
  const sort = useSelector((state) => state.filter.sort);
  const page = useSelector((state) => state.filter.page);
  const limit = useSelector((state) => state.filter.limit);
  const searchValue = useSelector((state) => state.filter.search);
  const { items, status } = useSelector((state) => state.pizza);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPizzas = async () => {
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
  };

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
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryID,
        page,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sort, categoryID, page, limit, navigate]);

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
