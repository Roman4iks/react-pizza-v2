import React from 'react';
import { useEffect } from 'react';
import { Sort } from '../components/Sort';
import { Categories } from '../components/Categories';
import { ContentItems } from '../components/ContentItems';
import { Pagination } from '../components/Pagination';
export const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <ContentItems />
      <Pagination />
    </div>
  );
};
