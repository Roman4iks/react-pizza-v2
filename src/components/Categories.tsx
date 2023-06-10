import { useDispatch, useSelector } from 'react-redux';
import { setCategoryID } from '../redux/slices/filterSlice';
import { SelectFilter } from '../redux/selectors';

export const Categories = () => {
  const categories: string[] = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const { categoryID } = useSelector(SelectFilter);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => dispatch(setCategoryID(index))}
            className={categoryID === index ? 'active' : ''}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
