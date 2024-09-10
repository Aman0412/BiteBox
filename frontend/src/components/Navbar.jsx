import 'boxicons';
import { Link } from 'react-router-dom';

export default function Navbar(props){
    if (props.page === "homepage"){
        return (
          <nav className="navbar">
            <div className="logo">
              <box-icon
                name="bowl-rice"
                class="logo-image"
                color="#333333"
              ></box-icon>
              <h1 className="logo-text">BiteBox</h1>
            </div>
            <div className="navbar-links">
              <button style={{backgroundColor:"#679b09"}}>
                <Link to="/join-now/plans/" style={{textDecoration:"none", color:"#FFFFFF", fontWeight:700}}>Get Started</Link>
              </button>
              <button style={{backgroundColor:"#333333", opacity:"50%"}}>
                <Link to="/login/" style={{textDecoration:"none", color:"#FFFFFF", fontWeight:700}}>Login</Link>
              </button>
            </div>
          </nav>
        );
    } else {
        return (
            <nav className="navbar">
            <div className="logo">
                <box-icon name='bowl-rice' class="logo-image" color="#333333"></box-icon>
                <h1 className="logo-text">BiteBox</h1>
            </div>
            </nav>
        )   
    }
}
