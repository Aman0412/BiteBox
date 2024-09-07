export default function CartItem({image, quantity, calories, protein, name}){
    return (
        <div className="cart-item">
            <img src={image} height={150} />
            <div className="cart-info">
                <h2>{name}</h2>
                <p>{calories} kcal / {protein}g Protein</p>
                <p>x {quantity}</p>
            </div>
        </div>
    )
}