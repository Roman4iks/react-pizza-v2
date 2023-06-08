import React, { useCallback, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search: React.FC = () => {
  const [searchTemp, setSearchTemp] = useState('');

  const dispatch = useDispatch();

  const updateSearchValue = useMemo(
    () =>
      debounce((str: string) => {
        dispatch(setSearchValue(str));
      }, 500),
    [dispatch]
  );

  const onChangeInputValue = useCallback(
    (event: any) => {
      setSearchTemp(event.target.value);
      updateSearchValue(event.target.value);
    },
    [updateSearchValue]
  );

  return (
    <input
      value={searchTemp}
      onChange={onChangeInputValue}
      className={styles.root}
      placeholder="Поиск... "
    />
  );
};

export default Search;
