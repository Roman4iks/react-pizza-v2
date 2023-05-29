import { useState } from "react";

export function Categories() {
  const [acitveCategory, setAcitveCategory] = useState(0)
  const categories = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"] 
  
  function onChangeCategory(index) {
    setAcitveCategory(index);
  }
  
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li onClick={() => onChangeCategory(index)} className={acitveCategory ===  index ? 'active' : ''}>{category}</li>
        ))}
      </ul>
    </div>
  );
}
