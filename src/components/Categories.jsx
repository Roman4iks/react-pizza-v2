import { useState } from "react";

export function Categories() {
  const [acitveCategory, setAcitveCategory] = useState(0)
  const categories = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"] 
  
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li key={index} onClick={() => setAcitveCategory(index)} className={acitveCategory ===  index ? 'active' : ''}>{category}</li>
        ))}
      </ul>
    </div>
  );
}
