import { useEffect, useState } from "react"
import api from "../api"

export default function MoreInfo({ id,  }){
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
    return (
        <div className="more-info-popup">
            <div className="more-info-popupinner">
                <div>
                    <button>X</button>
                </div>
                <h3>{meal.name}</h3>
            </div>
        </div>
    )
}