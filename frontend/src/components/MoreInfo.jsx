import { useEffect, useState } from "react"
import api from "../api"
import { X } from "lucide-react"

export default function MoreInfo({ id,  toggleMoreInfo }){
    const [meal, setMeal] = useState(null)
    useEffect(
        () => {
            async function getMeal(){
                const res = await api.get(`/api/meals/${id}`)
                setMeal(res.data)
            }
            getMeal();
        }, []
    )


    return meal === null ? (
      <div></div>
    ) : (
      <div className="more-info-popup">
        <div className="more-info-popupinner">
          <div className="moreinfo-image">
            <button onClick={() => toggleMoreInfo()}>
              <X />
            </button>
            <img src={meal.image} />
          </div>
          <h2>{meal.name}</h2>
          <div className="macro-information-container">
            <div className="macro-information">
              <p style={{ "font-weight": "500" }}>Carbs</p>
              <p>{meal.carbohydrates}</p>
            </div>
            <div className="vertical-line" />
            <div className="macro-information">
              <p>Protein</p>
              <p>{meal.protein}</p>
            </div>
            <div className="vertical-line" />
            <div className="macro-information">
              <p>Fat</p>
              <p>{meal.fat}</p>
            </div>
          </div>
          <div className="moreinfo-ingredients">
            <h3>Ingredients:</h3>
            <p>{meal.ingredients}</p>
          </div>
        </div>
      </div>
    );
}