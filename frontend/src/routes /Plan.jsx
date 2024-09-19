import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import { MealPlanContext, UseridContext } from "../App";
import { useNavigate } from "react-router";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Link } from "react-router-dom";

export default function Plan(){
    const {mealPlan, setMealPlan} = useContext(MealPlanContext);
    const { userid } = useContext(UseridContext); // Use the context
    const [isSignedIn, setIsSignedIn] = useState(userid != null)
    const [isNextClicked, setIsNextClicked] = useState(false)
    const navigate = useNavigate();

    // console.log(userid)
    
    function handleChange(event){
        const {name, value} = event.target;
        setMealPlan(prevMealPlan => {
            return {
                ...prevMealPlan,
                [name]: name === "number_of_meals" ? Number(value) : value
            }
        })
    }
    console.log(isSignedIn)

    function handleSubmit(event){
        event.preventDefault();
        if (isSignedIn){
            navigate("/join-now/meals")
        } else{
            setIsNextClicked(true)
        }

    }

    // console.log(userid)
    // console.log(mealPlan)
    console.log(!(isNextClicked) && (isSignedIn))
    
    const MEAL_SIZE_OPTIONS = ["S", "L"]
    const PROTEIN_PREFERENCE_OPTIONS = ["MO", "MV", "VO"]
    const MEAL_NUMBER_OPTIONS = [6, 8, 10, 12, 14, 16];
    return !(isNextClicked) && isSignedIn ? (
        <div>
            <Navbar />
            <div className="form">
            <form>
                <div className="form-container">
                    <h3>Meal Size</h3>
                    <ul className="meal-size"> 
                        {MEAL_SIZE_OPTIONS.map(OPTION =>
                            <li key={OPTION}>
                                <input type="radio" 
                                        id={OPTION} 
                                        name="meal_size" 
                                        value={OPTION} 
                                        onChange={handleChange} 
                                        checked={mealPlan.meal_size === OPTION} 
                                        className="option"/>
                                <label htmlFor={OPTION}>{OPTION === "S" ? "Standard" : "Large"}</label>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="form-container">
                    <h3>Protein Preference</h3>
                    <ul className="protein-preference">

                    {PROTEIN_PREFERENCE_OPTIONS.map(OPTION => {
                        let name;
                        if (OPTION == "MV"){
                            name = "Meat and Vegan";
                        } else if (OPTION == "MO") {
                            name = "Meat Only"
                        } else {
                            name = "Vegan Only"
                        }
                        
                        return (<li key={OPTION}>
                            <input type="radio" id={OPTION} name="protein_preference" value={OPTION} onChange={handleChange} checked={mealPlan.protein_preference === OPTION} className="option"/>
                            <label htmlFor={OPTION}>{name}</label>
                        </li>)
                    })}
                    
                    
                    </ul>
                </div>
                <div className="form-container"> 
                    <h3>Number of Meals</h3>
                    <ul className="number-of-meals">

                        {MEAL_NUMBER_OPTIONS.map(SIZE => (<li key={SIZE}> 
                            <input type="radio" id={SIZE} name="number_of_meals" value={SIZE} checked={mealPlan.number_of_meals == SIZE} onChange={handleChange} className="option"/>
                            <label htmlFor={SIZE}>{SIZE}</label> 
                        </li>) ) }
                        
                    </ul>
                </div>

            
                <button className="form-button" onClick={handleSubmit} >Next</button>
            </form>
            </ div>
        </div>
    
    ) : <GetStarted />
}


function GetStarted(){
    const [userObject, setUserObject] = useState({
        username:"",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
    })
    const { userid, setUserid } = useContext(UseridContext); // Use the context
    // const {mealPlan, setMealPlan} = useContext(MealPlanContext);
    
    // console.log(userObject)
    function handleChange(event){
        setUserObject(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }
    // console.log(userid)
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        //POST USER TO USER API
        async function createUser(){
            try{
                const res = await api.post("/auth/users/", userObject);
                setUserid(res.data.id);
                //get refresh and access tokens and set them to local storage
                const token_res = await api.post("/auth/jwt/create/", {
                    username: userObject.username,
                    password: userObject.password
                })
                localStorage.setItem(ACCESS_TOKEN, token_res.data.access)
                localStorage.setItem(REFRESH_TOKEN, token_res.data.refresh)
                // console.log(localStorage.getItem(ACCESS_TOKEN))
                navigate("/join-now/meals/")
                
            } catch (error){
                console.log(error)
            }
        }

        //SET USER ID
        //POST MEAL PLAN TO API
        createUser();
        console.log("User_id")
    }

    return ( 
        <div className="get-started-container">
            <Navbar />
            <div className="get-started-form-container">
                <h2 className="get-started-text">Get Started</h2>
                <form className="get-started-form">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text"
                        id="username"
                        name="username"
                        value={userObject.username}
                        onChange={handleChange}
                    />
                        <label htmlFor="first_name" className="get-started-item1">First Name</label>
                        <input 
                        type="text" 
                        id="first_name"
                        name="first_name"
                        className="get-started-item2"
                        value={userObject.first_name}
                        onChange={handleChange}
                        />
                        <label htmlFor="last_name" className="get-started-item3">Last Name</label>
                        <input 
                        type="text" 
                        id="last_name"
                        name="last_name"
                        className="get-started-item4"
                        value={userObject.last_name}
                        onChange={handleChange}
                        />

                    <label htmlFor="email" className="label">Email</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={userObject.email}
                    onChange={handleChange}
                    />
                    
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userObject.password}
                        onChange={handleChange}
                    />

                    <button onClick={handleSubmit}>Next</button>
                </form>
                <div className="already-member" style={{display:"flex", flexDirection:"row", gap:"10px", margin:" 1rem auto 0"}}>
                        <p>Have an account?</p>
                        <Link to="/login" style={{color:"#0000EE"}}>Login</Link>
                    </div>
            </div>
                                
        </div>
    )
}

    // // protein_preference = models.CharField(
    // //     max_length=2, 
    // //     choices=PROTEIN_PREFERENCE_OPTIONS,
    // //     default=MEAT_ONLY        
    // // )
    // // meal_size = models.CharField(
    // //     max_length=1,
    // //     choices=MEAL_SIZE_OPTIONS,
    // //     default=STANDARD_SIZE
    // // )
    // // number_of_meals = models.IntegerField()
    // price = models.DecimalField(max_digits=6, decimal_places=2)