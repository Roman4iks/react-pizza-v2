import { useEffect } from 'react';
import { Sort } from '../components/Sort';
import { Categories } from '../components/Categories';
import { ContentItems } from '../components/ContentItems';

export const Home = () => {
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
    </div>
  );
};
