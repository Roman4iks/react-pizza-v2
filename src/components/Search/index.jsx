import React, { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setValue } from '../../redux/slices/searchSlice';

const Search = () => {
  const [searchTemp, setSearchTemp] = useState('');
  const dispatch = useDispatch();
  const inputRef = useRef();

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setValue(str));
    }, 1000),
    []
  );

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
