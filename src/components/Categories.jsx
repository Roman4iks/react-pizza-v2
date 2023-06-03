import { useDispatch, useSelector } from 'react-redux';
import { setCategoryID } from '../redux/slices/filterSlice';

export function Categories() {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const filter = useSelector((state) => state.filter.categoryID);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => dispatch(setCategoryID(index))}
            className={filter === index ? 'active' : ''}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
