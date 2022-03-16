import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import Registration from "../components/pages/Registration";
import { useAuth } from "../contextApi/context";
import Admin from "./pages/Admin";
import { Notification } from "./pages/Notification";

export const Routers = () => {
    const { user, loggedIn } = useAuth();

    return (
        <Routes>
            <Route
                path="/"
                element={
                    loggedIn && user ? (
                        <Home user={user} />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="/register"
                element={
                    !loggedIn ? <Registration /> : <Navigate to="/login" />
                }
            />
            <Route
                path="/login"
                element={!loggedIn ? <Login /> : <Navigate to="/" />}
            />
            <Route path="/emailVerify" element={<Notification />} />
            <Route
                path="/admin"
                element={
                    loggedIn &&
                    (user.role === "admin" || user.role === "superadmin") ? (
                        <Admin />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
        </Routes>
    );
};
