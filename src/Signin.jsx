import "./styles/SignPage.css"
import { useNavigate, Link } from "react-router-dom"
import { useRef } from "react"
import { postAPI } from "./apicalls";
import useAuth from "./hooks/useAuth";

function SigninPage() {
    const navigate = useNavigate()
    const nameRef = useRef(null);
    const passwordRef = useRef(null);

    const submitAction = async (event) => {

        const { setAuth } = useAuth();
        event.preventDefault();
        const user = nameRef.current.value;
        const pwd = passwordRef.current.value;
        const response = await postAPI("auth/login", {
            username: user,
            password: pwd,
        }, {
            headers: { "Content-Type": 'application/json' },
            withCreedentials: true
        });
        const accessToken = response?.data?.access_token;
        const roles = response?.data?.roles;
        setAuth({ user, pwd, roles, accessToken })
        // Cookies.set("accessToken", response?.data);
        // Cookies.set("name", nameRef.current.value);
        // Cookies.set("password", passwordRef.current.value);
        navigate("/");
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
                    <Link to="/register">Need an Account?</Link>
                    <button type="submit">Sign in</button>
                </form>
            </section>
        </div>
    );
}

export default SigninPage;