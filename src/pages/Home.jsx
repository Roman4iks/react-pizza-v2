import { useEffect, useState } from 'react';
import { Sort } from '../components/Sort';
import { Categories } from '../components/Categories';
import { ContentItems } from '../components/ContentItems';

export const Home = () => {
  const [categoryID, setCategoryID] = useState(0);
  const [sort, setSort] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryID={categoryID} setCategoryID={setCategoryID} />
        <Sort sort={sort} setSort={setSort} />
      </div>
      <ContentItems categoryID={categoryID} sort={sort} search={search} />
    </div>
  );
};
