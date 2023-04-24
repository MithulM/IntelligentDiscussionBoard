import "./styles/LogPage.css"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"
import { useRef } from "react"

function LoginPage() {

    const navigate = useNavigate()
    const nameRef = useRef(null);
    const passwordRef = useRef(null);

    const submitAction = (event) => {
        event.preventDefault();
        Cookies.set("name", nameRef.current.value);
        Cookies.set("password", passwordRef.current.value);
        return navigate("/")
    }

    return (
        <div className="logContainer">
            <section className="log">
                <h1 className="heading">Login</h1>
                <form onSubmit={submitAction} className="login-form">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        placeholder="Enter your username"
                        ref={nameRef}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="Enter your password"
                        ref={passwordRef}
                    />
                    <button type="submit">Login</button>
                </form>
            </section>
        </div>
    );
}

export default LoginPage;