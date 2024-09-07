
export default function Card({ image, calories, name, handleIncrement, handleDecrement, quantity}){
    return(
        <div className="meal-card">
            {image && <img src={image} alt={name} className="meal-image" height="250px" width="250px" />}
            <div className="meal-content">
                {calories && (<div className="calorie-badge">{calories} kcal</div>)}
                <h3 className="meal-name">{name}</h3>
                <p >More Info</p>
                <div className="quantity-control">
                    <button onClick={handleDecrement}>-</button>
                    <span className="quantity">{quantity}</span>
                    <button onClick={handleIncrement}>+</button>
                </div>
            </div>
        </div>
    )
}