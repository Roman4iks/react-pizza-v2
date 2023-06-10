import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEvent } from './useEvent';

const defaultDeserialize = <Value,>(v: string | null) => v as Value;
const defaultSerialize = String;

interface UseSearchParamsStateOptions<Value> {
  name: string;
  serialize?: (value: Value) => string;
  deserialize?: (value: string | null) => Value;
}

function getSearchParam(search: string, param: string) {
  const searchParams = new URLSearchParams(search);
  return searchParams.get(param);
}

function setSearchParam(search: string, param: string, value: string) {
  const searchParams = new URLSearchParams(search);
  searchParams.set(param, value);
  return searchParams.toString();
}

export function useSearchParamsState<Value>({
  name,
  serialize = defaultSerialize,
  deserialize = defaultDeserialize,
}: UseSearchParamsStateOptions<Value>) {
  const location = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState(() => {
    const initialValue = deserialize(getSearchParam(location.search, name));
    return initialValue;
  });

  const updateValue = useEvent((newValue) => {
    const search = window.location.search;
    const actualNewValue =
      typeof newValue === 'function' ? newValue(value) : newValue;
    setValue(actualNewValue);
    const newSearch = setSearchParam(search, name, serialize(actualNewValue));
    navigate(`/?${newSearch}`);
  });
  return [value, updateValue] as const;
}
