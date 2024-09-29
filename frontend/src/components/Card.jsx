import { useState } from "react";
import PropTypes from "prop-types";
import MoreInfo from "./MoreInfo"

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

  function toggleMoreInfo(){
    setIsMoreInfoSelected(selected => !selected)

  }

  if (isMoreInfoSelected){
    document.body.classList.add("active-modl")
  } else{
    document.body.classList.remove("active-modl")
  }
  return (
    <div>
      {isMoreInfoSelected && (<MoreInfo id={id} toggleMoreInfo={toggleMoreInfo} />)}
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
          <button className="more-info-button" onClick={toggleMoreInfo}>More Info</button>
          <div className="quantity-control">
            <button onClick={handleDecrement}>-</button>
            <span className="quantity">{quantity}</span>
            <button onClick={handleIncrement}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  calories: PropTypes.number,
  is_dairy_free: PropTypes.bool,
  is_gluten_free: PropTypes.bool,
  name: PropTypes.string.isRequired,
  handleIncrement: PropTypes.func.isRequired,
  handleDecrement: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
};