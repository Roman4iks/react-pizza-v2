import React, { useMemo } from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { useSearchParamsState } from '../../hooks/useSearchParamsState';

const Search: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useSearchParamsState({
    name: 'search',
    deserialize: (v) => v || '',
  });

  const updateSearchValue = useMemo(
    () =>
      debounce((str: string) => {
        dispatch(setSearchValue(str));
      }, 500),
    [dispatch]
  );

  const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setValue(value);

    updateSearchValue(value);
  };

  return (
    <input
      value={value}
      onChange={onChangeInputValue}
      className={styles.root}
      placeholder="Поиск... "
    />
  );
};

export default Search;
