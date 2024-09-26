import { useState } from "react";

export default function Card({
  id,
  image,
  calories,
  is_dairy_free,
  is_gluten_free,
  name,
  handleIncrement,
  handleDecrement,
  quantity,
}) {
  const [isMoreInfoSelected, setIsMoreInfoSelected] = useState(false);
  console.log(is_dairy_free)
  console.log(is_gluten_free)


  return (
    <div className="meal-card">
      {image && (
        <img
          src={image}
          alt={name}
          className="meal-image"
          height="250px"
          width="250px"
        />
      )}
      <div className="meal-content">
        <div className="badge-container">
          {calories && <div className="calorie-badge">{calories} kcal</div>}
          {is_dairy_free && <div className="dairyfree-badge">DF</div>}
          {is_gluten_free && <div className="glutenfree-badge">GF</div>}
        </div>
        <h3 className="meal-name">{name}</h3>
        <button className="more-info-button">More Info</button>
        <div className="quantity-control">
          <button onClick={handleDecrement}>-</button>
          <span className="quantity">{quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
      </div>
    </div>
  );
}
