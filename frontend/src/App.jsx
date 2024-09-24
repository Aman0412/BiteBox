import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import Homepage from "./routes/Homepage";
import Plan from "./routes/Plan";
import Meals from "./routes/Meals";
import Cart from "./routes/Cart";
import { createContext, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoutes";
import Login from "./routes/Login";
import Details from "./routes/Details";
import ExistingAddress from "./routes/ExistingDetails";

const router = createBrowserRouter([
      {
        path: "/",
        element: <Homepage />,
    },
      {
        path: "join-now/plans",
        element: <Plan />    
    },
      {
        path: "join-now/meals",
        element: (
          <ProtectedRoute>
            <Meals />
          </ProtectedRoute>
        )

    },
    {
      path:"login/",
      element:<Login />
   },
   {
    path:"join-now/details",
    element:(
      <ProtectedRoute>
        <Details />
      </ProtectedRoute>
    )
   },
   {
    path:"/cart",
    element:(
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    )
   },
   {
    path:"/existing-details",
    element: (
      <ProtectedRoute>
        <ExistingAddress />
      </ProtectedRoute>
    )
   }
]);

export const UseridContext = createContext(null)
export const MealPlanContext = createContext()

export default function App(){
  const [userid, setUserid] = useState(null)
  const [mealPlan, setMealPlan] = useState({
        protein_preference: "MO",
        meal_size: "S",
        number_of_meals: 6,
        price: 59.99
    })

  return (
    <UseridContext.Provider value={{userid, setUserid}} >
      <MealPlanContext.Provider value={{mealPlan, setMealPlan}} >
        <RouterProvider router={router} />
      </MealPlanContext.Provider>
    </UseridContext.Provider>
  )

}