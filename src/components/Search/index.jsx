import React, { useContext } from 'react';
import { SeacrhContext } from '../../App';
import styles from './Search.module.scss';

const Search = () => {
  const { searchValue, setSearchValue } = useContext(SeacrhContext);

  console.log(searchValue);
  console.log(setSearchValue);

  return (
    <input
      value={searchValue}
      onChange={(event) => setSearchValue(event.target.value)}
      className={styles.root}
      placeholder="Поиск..."
    />
  );
};

export default Search;
