import React, { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search = () => {
  const [searchTemp, setSearchTemp] = useState('');
  const dispatch = useDispatch();
  const inputRef = useRef();

  const updateSearchValue = debounce((str) => {
    dispatch(setSearchValue(str));
  }, 500);

  const onChangeInputValue = (event) => {
    setSearchTemp(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <input
      ref={inputRef}
      value={searchTemp}
      onChange={(event) => onChangeInputValue(event)}
      className={styles.root}
      placeholder="Поиск..."
    />
  );
};

export default Search;
