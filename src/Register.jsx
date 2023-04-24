import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postAPI } from "./apicalls";
import "./styles/LogPage.css"

const Register = () => {
    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState("");
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordMatchRef = useRef(null);

    const submitAction = (event) => {
        event.preventDefault();
        if (passwordRef.current.value !== passwordMatchRef.current.value) {
            setErrorMessage("Passwords do not match");
        } else {
            postAPI("register", {
                username: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            })
            navigate("/");
        }
    }


    return (
        <div className="logContainer">
            <section className="log" onSubmit={submitAction}>
                <h1 className="heading">Register</h1>
                <form className="login-form">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        autoComplete="off"
                        placeholder="Enter your username"
                        required
                        ref={nameRef}
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Enter your email"
                        required
                        ref={emailRef}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Enter your password"
                        required
                        ref={passwordRef}
                    />
                    <label htmlFor="passwordMatch">Confirm Password:</label>
                    <input
                        type="password"
                        id="passwordMatch"
                        name="passwordMatch"
                        autoComplete="off"
                        placeholder="Enter your password again"
                        required
                        ref={passwordMatchRef}
                    />
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <Link to="/login">Already registered?</Link>
                    <button type="submit">Register</button>
                </form>
            </section>
        </div>
    )
}

export default Register