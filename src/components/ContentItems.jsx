import { useState, useEffect } from 'react';
import { PizzaBlock } from './PizzaBlock';
import PizzaBlockSkeleton from './skeletons/PizzaBlockSkeleton';
import { useSelector } from 'react-redux';
import axios from 'axios';

export function ContentItems() {
  const [items, setItems] = useState([]);
  const categoryID = useSelector((state) => state.filter.categoryID);
  const sort = useSelector((state) => state.filter.sort);
  const page = useSelector((state) => state.filter.page);
  const limit = useSelector((state) => state.filter.limit);
  const searchValue = useSelector((state) => state.filter.search);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, [sort, searchValue, categoryID, page, limit]);

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
