import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         // Here you can check if the token is valid and non-expired.
    //         // You can also update the `auth` state with the token data.
    //         // For example:
    //         const decodedToken = jwt_decode(token);
    //         if (decodedToken.exp < Date.now() / 1000) {
    //             localStorage.removeItem("token");
    //         } else {
    //             setAuth({ token, role: decodedToken.role });
    //         }
    //     }
    // }, [setAuth]);

    return auth?.role ? <Outlet /> : <Navigate to="/signin" state={{ from: location }} replace />;
};


export const NotAuth = () => {
    const { auth } = useAuth();
    return (auth?.accessToken
        ? <Navigate to="/" replace /> : <Outlet />)
}

export default RequireAuth;