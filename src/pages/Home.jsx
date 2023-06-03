import { useEffect, useState } from 'react';
import { Sort } from '../components/Sort';
import { Categories } from '../components/Categories';
import { ContentItems } from '../components/ContentItems';
import { Pagination } from '../components/Pagination';

export const Home = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <ContentItems page={page} limit={limit} />
      <Pagination onChangePage={(number) => setPage(number)} />
    </div>
  );
};
