import { PizzaBlock } from "./components/PizzaBlock";
import { Categories } from "./components/Categories";
import { Header } from "./components/Header";
import { Sort } from "./components/Sort";
import "./scss/app.scss";
import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://64762957e607ba4797dd62ed.mockapi.io/pizza/items")
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((item, index) => (
              <PizzaBlock
                key={index}
                image={item.imageUrl}
                title={item.title}
                price={item.price}
                types={item.types}
                sizes={item.sizes}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
