import { NavLink } from "react-router-dom";

const About = (props) => {
    return(
        <div>
            <h2>About page</h2>
            <p>Lorem ipsum</p>
            <NavLink className="nav-link" to="/">
            Back to home
            </NavLink> 
        </div>
    )
}

export default About;