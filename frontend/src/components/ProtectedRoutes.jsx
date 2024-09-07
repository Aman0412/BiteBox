import { useNavigate } from "react-router";
import {jwtDecode} from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN} from "../constants";
import { useEffect, useState } from "react";


// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ children }){
    const [isAuth, setIsAuth] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        try{
            auth();
        } catch (error){
            console.log(error)
        }
    }, [])
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const res = await api.post("/auth/jwt/refresh/", {
                refresh: refreshToken
            });
            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuth(true);
            }
        } catch (error) {
            console.log(error)
            setIsAuth(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token){
            setIsAuth(false);
            return
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if (tokenExpiration < now) {
            await refreshToken();
        }else{
            setIsAuth(true);
        }
    }

    if (isAuth === null){
        return <div className="loading">Loading...</div>
    }

    return isAuth ? children : navigate("/join-now/plans")
}