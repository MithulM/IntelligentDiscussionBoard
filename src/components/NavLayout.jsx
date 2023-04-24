import { useNavigate, Outlet } from "react-router-dom";
import FancyButton from "./FancyButton.jsx";
import "../styles/NavLayout.css"
import useAuth from "../hooks/useAuth.jsx";

function NavLayout({ courseList }) {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();

    const signout = (event) => {
        event.preventDefault();
        setAuth({});
        console.log("Auth: ", auth);
        navigate("/signin");
    }

    return (
        <div className="container">
            <div className="menu">
                <ul>
                    <li>
                        <FancyButton to="/" menuTab="Home" onClick={() => navigate("/")} />
                    </li>
                    {
                        courseList.map(courseName =>
                            <li key={courseName.id}>
                                <FancyButton to={"/" + courseName.class.toLowerCase().replace(/\s/g, '')} menuTab={courseName.class} onClick={() => navigate("/" + courseName.class.toLowerCase().replace(/\s/g, ''))} />
                            </li>)
                    }
                    <li>
                        <button onClick={signout} >
                            <span className="circle" aria-hidden="true">
                                <span className="icon arrow"></span>
                            </span>
                            <span className="button-text">Sign Out</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div className="page">
                <Outlet />
            </div>
        </div>
    )
}

export default NavLayout;