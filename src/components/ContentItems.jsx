import { useState, useEffect } from 'react';
import { PizzaBlock } from './PizzaBlock';
import PizzaBlockSkeleton from './skeletons/PizzaBlockSkeleton';

export function ContentItems({ sort, search, categoryID }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(sort);
        const response = await fetch(
          `https://64762957e607ba4797dd62ed.mockapi.io/pizza/items?${
            !sort ? '' : `&sortBy=${sort.sortProperty}`
          }${search === '' ? '' : `&search=${search}`}${
            categoryID === 0 ? '' : `&category=${categoryID}`
          }`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [sort, search, categoryID]);

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
