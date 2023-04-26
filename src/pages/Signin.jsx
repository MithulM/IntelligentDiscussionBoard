import "../styles/SignPage.css"
import { useNavigate, Link } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import { postAPI, getAPI } from "../apicalls";
import useAuth from "../hooks/useAuth";
import IDBLogo from "../../public/IDBLogo.png";

function SigninPage() {
    const navigate = useNavigate()
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const [courseList, setCourseList] = useState([]);
    const { auth, setAuth } = useAuth();

    const submitAction = async (event) => {

        event.preventDefault();
        const user = nameRef.current.value;
        const pwd = passwordRef.current.value;
        await postAPI("auth/login", {
            username: user,
            password: pwd,
        }, {
            headers: { "Content-Type": 'application/json' },
            withCredentials: true
        }).then((response) => {
            const accessToken = response?.access_token;
            const role = response?.role;
            const email = response?.email;
            const user_id = response?.user_id;
            setAuth({ user, email, pwd, user_id, role, accessToken, courseList });
        }).catch((e) => {
            alert("Invalid credentials given!")
            console.error(e);
        });
    }

    useEffect(() => {
        const fetchUserCourses = async () => {
            try {
                const response = await getAPI(
                    "user_courses",
                    [],
                    setCourseList,
                    {
                        headers: {
                            "Content-Type": 'application/json',
                            "Authorization": `Bearer ${auth.accessToken}`
                        },
                        withCredentials: true
                    }
                ).then((response) => {
                    setAuth({ ...auth, courseList });
                    navigate("/");
                }).catch((e) => {
                    alert("Invalid autherization given!")
                    console.error(e);
                });
            } catch (error) {
                console.error(error);
            }
        };

        if (auth.accessToken) {
            fetchUserCourses();
        }
    }, [auth.accessToken]);

    useEffect(() => {
        console.log("Auth: ", auth);
    }, [courseList])

    return (
        <div className="signContainer">
            <section className="sign">
                <img src={IDBLogo} alt="IDB Logo" />
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
