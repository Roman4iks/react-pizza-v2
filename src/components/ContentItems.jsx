import { useState, useEffect, useContext } from 'react';
import { PizzaBlock } from './PizzaBlock';
import PizzaBlockSkeleton from './skeletons/PizzaBlockSkeleton';
import { SeacrhContext } from '../App';

export function ContentItems({ sort, categoryID, page, limit }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue } = useContext(SeacrhContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://64762957e607ba4797dd62ed.mockapi.io/pizza/items?${
            !sort
              ? ''
              : `&sortBy=${sort.sortProperty.replace('-', '')}&order=${
                  sort.sortProperty.includes('-') ? 'asc' : 'desc'
                }`
          }${searchValue === '' ? '' : `&search=${searchValue}`}${
            categoryID === 0 ? '' : `&category=${categoryID}`
          }${!limit ? '' : `&limit=${limit}`}${!page ? '' : `&page=${page}`}`
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
