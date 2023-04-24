import "./styles/SignPage.css"
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom"
import { useRef } from "react"

function SigninPage() {

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
        <div className="signContainer">
            <section className="sign">
                <h1 className="heading">Sign in</h1>
                <form onSubmit={submitAction} className="signin-form">
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
                    <Link to="/register">Already have an account?</Link>
                    <button type="submit">Sign in</button>
                </form>
            </section>
        </div>
    );
}

export default SigninPage;