import { useEffect, useState } from 'react';
import { Sort } from '../components/Sort';
import { Categories } from '../components/Categories';
import { ContentItems } from '../components/ContentItems';

export const Home = () => {
  const [categoryID, setCategoryID] = useState(0);
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryID={categoryID} setCategoryID={setCategoryID} />
        <Sort setSort={setSort} setOrder={setOrder} />
      </div>
      <ContentItems
        categoryID={categoryID}
        sort={sort}
        search={search}
        order={order}
      />
    </div>
  );
};
