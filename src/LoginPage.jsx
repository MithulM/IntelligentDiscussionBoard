import "./LoginPage.css"
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom"
import { useRef } from "react"

function LoginPage() {

    const navigate = useNavigate()
    const nameRef = useRef(null);
    const passwordRef = useRef(null);

    function setUserInfo(event) {
        event.preventDefault();
        Cookies.set("name", nameRef.current.value);
        Cookies.set("password", passwordRef.current.value);
        return navigate("/")
    }

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={setUserInfo}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required placeholder="Enter your username" ref={nameRef} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required placeholder="Enter your password" ref={passwordRef} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;