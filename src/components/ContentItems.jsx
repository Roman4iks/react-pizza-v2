import { useState, useEffect } from "react";
import { PizzaBlock } from "./PizzaBlock";


export function ContentItems(){
const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://64762957e607ba4797dd62ed.mockapi.io/pizza/items"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  return (<><h2 className="content__title">Все пиццы</h2>
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
        </>)
        }