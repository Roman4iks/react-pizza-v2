import React from 'react';
import { Sort } from '../components/Sort';
import { Categories } from '../components/Categories';
import { ContentItems } from '../components/ContentItems';
export const Home = () => {
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <ContentItems />
    </>
  );
};
