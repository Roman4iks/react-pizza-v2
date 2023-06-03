import { useEffect, useState } from 'react';
import { Sort } from '../components/Sort';
import { Categories } from '../components/Categories';
import { ContentItems } from '../components/ContentItems';
import { Pagination } from '../components/Pagination';

export const Home = () => {
  const [sort, setSort] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort sort={sort} setSort={setSort} />
      </div>
      <ContentItems page={page} limit={limit} sort={sort} />
      <Pagination onChangePage={(number) => setPage(number)} />
    </div>
  );
};
