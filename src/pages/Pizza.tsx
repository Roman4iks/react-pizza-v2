import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartById } from '../redux/slices/cartSlice';
import { Pizza } from '../redux/slices/pizzaSlice';

const typeNames = ['тонкое', 'традиционное'];

const PizzaBlock: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<Pizza>();

  const [sizeActive, setSizeActive] = useState<number>(0);
  const [typeActive, setTypeActive] = useState<number>(0);

  const cartItem = useSelector(selectCartById(Number(id)));
  const addedCount = cartItem ? cartItem.count : 0;

  const dispatch = useDispatch();

  const onClickAdd = () => {
    if (pizza) {
      const item = {
        ...pizza,
        type: typeNames[typeActive],
        size: pizza.sizes[sizeActive],
        count: 0,
      };
      dispatch(addItem(item));
    }
  };

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://64762957e607ba4797dd62ed.mockapi.io/pizza/items/${id}`
        );
        setPizza(data);
      } catch {
        alert('Pizza not Found');
      }
    }
    fetchPizza();
  }, [id]);

  if (!pizza || !pizza.sizes) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="container">
      <div className="content__items">
        <div>
          <img
            src={pizza.imageUrl}
            className="pizza-block__image"
            alt="Pizza"
          />
        </div>
        <h1>{pizza.title}</h1>
        <h3>Рейтинг: {pizza.rating}</h3>
        <h4>Цена: {pizza.price} UAH</h4>

        <div className="pizza-block__selector">
          <ul>
            {pizza.sizes.map((size, index) => (
              <li
                key={index}
                onClick={() => setSizeActive(index)}
                className={sizeActive === index ? 'active' : ''}
              >
                {size} см.
              </li>
            ))}
          </ul>
          <ul>
            {pizza.types.map((type, index) => (
              <li
                key={index}
                onClick={() => setTypeActive(type)}
                className={typeActive === type ? 'active' : ''}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
        </div>
        <div
          onClick={onClickAdd}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
