import { useNavigate, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import FancyButton from "./FancyButton.jsx";
import "../styles/NavLayout.css";
import useAuth from "../hooks/useAuth.jsx";


function NavLayout({ courseList }) {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const signout = (event) => {
    event.preventDefault();
    setAuth({});
    console.log("Auth: ", auth);
    navigate("/signin");
  };

  return (
    <div className="container">
      <div className="menu">
        <ul className="buttons">
          <li className="coursesButton">
            <FancyButton
              to="/"
              menuTab="Home"
              onClick={() => navigate("/")}
            />
          </li>
          {courseList.map((courseName) => (
            <li key={courseName.course_id} className="coursesButton">
              <FancyButton
                to={"/" + courseName.course_number.toLowerCase().replace(/\s/g, "")}
                menuTab={courseName.course_number}
                onClick={() =>
                  navigate("/" + courseName.course_number.toLowerCase().replace(/\s/g, ""))
                }
              />
            </li>
          ))}
        </ul>
        <button className="signout" onClick={signout}>
          <span className="icon"><FontAwesomeIcon icon={faSignOutAlt} /></span>
          <span className="button-text">Sign Out</span>
        </button>
      </div>
      <div className="page">
        <Outlet />
      </div>
    </div>
  );
}

export default NavLayout;
