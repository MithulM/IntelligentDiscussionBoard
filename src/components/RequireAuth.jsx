import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();

    return auth?.role ? <Outlet /> : <Navigate to="/signin" state={{ from: location }} replace />;
};


export const NotAuth = () => {
    const { auth } = useAuth();
    return (auth?.accessToken
        ? <Navigate to="/" replace /> : <Outlet />)
}

export default RequireAuth;