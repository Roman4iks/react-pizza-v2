import React, { useContext } from 'react';
import { SeacrhContext } from '../../App';
import styles from './Search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setValue } from '../../redux/slices/searchSlice';

const Search = () => {
  const searchValue = useSelector((state) => state.search.value);
  const dispatch = useDispatch();

  return (
    <input
      value={searchValue}
      onChange={(event) => dispatch(setValue(event.target.value))}
      className={styles.root}
      placeholder="Поиск..."
    />
  );
};

export default Search;
