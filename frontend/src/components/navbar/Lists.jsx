import { NavLink } from "react-router-dom";
import { useAuth } from "../../contextApi/context";

const Lists = ({ list, active }) => {
    const { logOut, user } = useAuth();

    return (
        <>
            {user.isVerify ? (
                <ul className={list}>
                    <li>
                        <NavLink
                            to="/"
                            className={(link) => (link.isActive ? active : "")}
                        >
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin"
                            className={(link) => (link.isActive ? active : "")}
                        >
                            Admin Pannel
                        </NavLink>
                    </li>
                    <li>
                        <span style={{ cursor: "pointer" }} onClick={logOut}>
                            Logout
                        </span>
                    </li>
                </ul>
            ) : (
                <ul className={list}>
                    <li>
                        <NavLink
                            to="/register"
                            className={(link) => (link.isActive ? active : "")}
                        >
                            SignUp
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/login"
                            className={(link) => (link.isActive ? active : "")}
                        >
                            Login
                        </NavLink>
                    </li>
                </ul>
            )}
        </>
    );
};

export default Lists;
