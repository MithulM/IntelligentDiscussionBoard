import { useNavigate, Outlet } from "react-router-dom";
import FancyButton from "./FancyButton.jsx";
import "./styles/NavLayout.css"

function NavLayout({ courseList }) {
    const navigate = useNavigate();

    const logout = (event) => {
        event.preventDefault();
        Cookies.remove("name");
        Cookies.remove("password");
        navigate("/login");
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
                        <FancyButton to="/login" menuTab="Logout" onClick={logout} />
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