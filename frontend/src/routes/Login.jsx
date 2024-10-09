import { UseridContext } from "../App"
import Navbar from "../components/Navbar";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login(){
    localStorage.clear()
    const navigate = useNavigate();
    const { userid, setUserid } = useContext(UseridContext); // Use the context

    const [userObject, setUserObject] = useState({
        username:"",
        password:""
    });
    const [failedLogin, setFailedLogin] = useState(false)

    function handleChange(event){
        setUserObject(prevUserObject => {
            return {
                ...prevUserObject,
                [event.target.name] : event.target.value
            }
        })
    }

    async function handleSubmit(event){
        event.preventDefault();
        setFailedLogin(false)
        try{
            //get refresh and access tokens and set them to local storage
            const res = await api.post("/auth/jwt/create/", {
                username: userObject.username,
                password: userObject.password
            })
            await localStorage.setItem(ACCESS_TOKEN, res.data.access)
            await localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
            const user_res = await axios.get(import.meta.env.VITE_API_URL + "/auth/users/me/", {
                headers: {
                    Authorization: `JWT ${res.data.access}`
                }
            })
            setUserid(user_res.data.id)
            navigate("/join-now/plans/")

            
        } catch (error){
            console.log(error)
            setFailedLogin(true)
        }
    }

    console.log(userid)
    return (
      <div>
        <Navbar />
        <div className="login-form-container">
          <h2>Login</h2>
          <form>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={userObject.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={userObject.password}
                onChange={handleChange}
              />
            </div>
            <div className="login-get-started" style={{display:"flex",flexDirection:"row", gap:"0.4rem", width:"100%"}}>
              <p>Are you a new customer?</p> 
              <Link style={{color:"blue"}} to="/join-now/plans"> Click Here</Link>
            </div>
            {failedLogin && <p style={{color:"red"}}>Login failed, check your username/password</p>}
            <button onClick={handleSubmit}>Login</button>
          </form>
        </div>
      </div>
    );
}