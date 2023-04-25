import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postAPI } from "../apicalls";
import "../styles/SignPage.css"
import useAuth from "../hooks/useAuth";
import IDBLogo from "../../public/IDBLogo.png";
import backgroundImage from "../../public/testBackground.png";

const Register = () => {
    const navigate = useNavigate()
    const { auth, setAuth } = useAuth();

    const [errorMessage, setErrorMessage] = useState("");
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordMatchRef = useRef(null);

    const submitAction = async (event) => {
        event.preventDefault();
        if (passwordRef.current.value !== passwordMatchRef.current.value) {
            setErrorMessage("Passwords do not match");
        } else {
            const response = await postAPI("auth/register", {
                username: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }, {
                headers: { "Content-Type": 'application/json' },
                withCredentials: true
            });
            const accessToken = response?.data?.access_token;
            const roles = response?.data?.roles;
            console.log("Here")
            setAuth({ user, pwd, roles, accessToken })
            navigate("/");
        }
    }


    return (
        <div className="signContainer">
            <section className="sign" onSubmit={submitAction}>
            <img src={IDBLogo} alt="IDB Logo" />
                <h1 className="heading">Register</h1>
                <form>
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
                    <Link to="/signin">Already registered?</Link>
                    <button type="submit">Register</button>
                </form>
            </section>
        </div>
    )
}

export default Register