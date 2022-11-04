import { NavLink } from "react-router-dom";

const About = (props) => {
    return(
        <div>
            <h2>About</h2>
            <p>"Datankanssa – A Business Intelligence Suite" is a MERN stack exercise by Henri Pitkänen</p>
            <NavLink className="nav-link" to="/">
            Back to home
            </NavLink> 
        </div>
    )
}

export default About;