import { NavLink } from "react-router-dom";
import { useAuth } from "../../contextApi/context";

const Lists = ({ list, active, activeSignup, activeLogin, hideNav }) => {
    const { logOut, user } = useAuth();

    return (
        <>
            {user.isVerify ? (
                <ul className={list}>
                    <li>
                        <NavLink
                            onClick={hideNav}
                            to="/categories"
                            className={(link) => (link.isActive ? active : "")}
                        >
                            Categories
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={hideNav}
                            to="/team"
                            className={(link) => (link.isActive ? active : "")}
                        >
                            Team Members
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={hideNav}
                            to="/posts"
                            className={(link) => (link.isActive ? active : "")}
                        >
                            Posts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={hideNav}
                            to="/about"
                            className={(link) => (link.isActive ? active : "")}
                        >
                            About us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={hideNav}
                            to="/"
                            className={(link) => (link.isActive ? active : "")}
                        >
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={hideNav}
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
                            onClick={hideNav}
                            to="/categories"
                            className={(link) => (link.isActive ? active : "")}
                        >
                            Categories
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={hideNav}
                            to="/team"
                            className={(link) => (link.isActive ? active : "")}
                        >
                            Team Members
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={hideNav}
                            to="/posts"
                            className={(link) => (link.isActive ? active : "")}
                        >
                            Posts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={hideNav}
                            to="/about"
                            className={(link) => (link.isActive ? active : "")}
                        >
                            About us
                        </NavLink>
                    </li>
                    <li className={activeLogin}>
                        <NavLink
                            onClick={hideNav}
                            to="/login"
                            className={(link) => (link.isActive ? active : "")}
                        >
                            Login
                        </NavLink>
                    </li>
                    <li className={activeSignup}>
                        <NavLink
                            onClick={hideNav}
                            to="/register"
                            className={(link) => (link.isActive ? active : "")}
                        >
                            SignUp
                        </NavLink>
                    </li>
                </ul>
            )}
        </>
    );
};

export default Lists;
