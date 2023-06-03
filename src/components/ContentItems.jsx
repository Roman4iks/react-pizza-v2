import { useState, useEffect, useRef } from 'react';
import { PizzaBlock } from './PizzaBlock';
import PizzaBlockSkeleton from './skeletons/PizzaBlockSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../redux/slices/filterSlice';
import { sorting } from './Sort';

export function ContentItems() {
  const [items, setItems] = useState([]);
  const categoryID = useSelector((state) => state.filter.categoryID);
  const sort = useSelector((state) => state.filter.sort);
  const page = useSelector((state) => state.filter.page);
  const limit = useSelector((state) => state.filter.limit);
  const searchValue = useSelector((state) => state.filter.search);

  const isSeacrh = useRef(false);
  const isMounted = useRef(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

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

      isSeacrh.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSeacrh.current) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://64762957e607ba4797dd62ed.mockapi.io/pizza/items`,
            {
              params: {
                ...(sort && {
                  sortBy: sort.sortProperty.replace('-', ''),
                  order: sort.sortProperty.includes('-') ? 'asc' : 'desc',
                }),
                ...(searchValue && { search: searchValue }),
                ...(categoryID !== 0 && { category: categoryID }),
                ...(limit && { limit: limit }),
                ...(page && { page: page }),
              },
            }
          );
          setItems(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
    isSeacrh.current = false;
  }, [sort, searchValue, categoryID, page, limit]);

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
        {isLoading ? 'Загрузка...' : 'Все пиццы'}
      </h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => (
              <PizzaBlockSkeleton key={index} />
            ))
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </>
  );
}
