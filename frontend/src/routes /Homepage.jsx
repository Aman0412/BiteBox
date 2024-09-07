import { Link } from "react-router-dom";
import "../components/Navbar"
import Navbar from "../components/Navbar";

export default function Homepage(){
    return (
        <div>
        <Navbar />
        <Link to="/join-now/plans/">Get Started</Link>  
        <Link to="/login/">Login</Link>     
        </div>
    )
}