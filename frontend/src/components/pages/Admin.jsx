import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { useAuth } from "../../contextApi/context";
import style from "../../css/modules/Admin.module.css";

const roleStates = {
    people: [],
    roleEdit: false,
    roleName: "",
    roleId: "",
};

const roleReducer = (state, action) => {
    switch (action.type) {
        case "user":
            return {
                ...state,
                people: action.result,
            };
        case "roleEdit":
            return {
                ...state,
                roleEdit: action.result,
            };
        case "roleName":
            return {
                ...state,
                roleName: action.result,
            };
        case "roleId":
            return {
                ...state,
                roleId: action.result,
            };
        default:
            return state;
    }
};

const Admin = () => {
    const { user } = useAuth();

    const [state, dispatch] = useReducer(roleReducer, roleStates);
    const { people, roleEdit, roleName, roleId } = state;

    useEffect(() => {
        const users = async () => {
            try {
                const allUsers = await axios.get("/admin/all", {
                    headers: {
                        "Content-type": "application/json",
                    },
                });

                allUsers &&
                    dispatch({
                        type: "user",
                        result: allUsers.data.allUsers,
                    });
            } catch (err) {
                console.log(err.response);
            }
        };
        users();
    }, []);

    const onRoleChange = (e) => {
        dispatch({ type: "roleName", result: e.target.value });
    };

    const roleSubmit = async () => {
        try {
            await axios.post(
                `/admin/all/${roleId}`,
                JSON.stringify({ role: roleName }),
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            );
            alert("role Updated!");
            window.location.reload();
        } catch (err) {
            console.log(err.response);
        }
    };

    const handleEdit = (e) => {
        roleEdit
            ? dispatch({ type: "roleEdit", result: false })
            : dispatch({ type: "roleEdit", result: true });

        dispatch({ type: "roleName", result: e.target.getAttribute("name") });
        dispatch({ type: "roleId", result: e.target.id });
    };

    const handleCancle = () => {
        dispatch({ type: "roleEdit", result: false });
    };

    const handleDelete = async (e) => {
        try {
            await axios.delete(`/admin/all/${e.target.id}`);
            alert("User Deleted Successfully");
        } catch (err) {
            console.log(err.response);
        }
        window.location.reload();
    };

    return (
        <>
            <div className={style.adminDiv}>
                <div className={style.background}></div>
                <h1 className={style.heading}>User Lists</h1>
                <table className={style.userLists}>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map((u, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{u.username}</td>
                                    <td>{u.email}</td>
                                    <td>
                                        {roleEdit && roleId === u._id ? (
                                            <select
                                                onChange={onRoleChange}
                                                disabled={
                                                    ((u.role === "superadmin" ||
                                                        u.role === "admin") &&
                                                        user.role ===
                                                            "admin") ||
                                                    u.email === user.email
                                                }
                                                value={roleName}
                                            >
                                                <option
                                                    value="member"
                                                    selected={
                                                        u.role === "member"
                                                    }
                                                >
                                                    Member
                                                </option>
                                                <option
                                                    value="editor"
                                                    selected={
                                                        u.role === "editor"
                                                    }
                                                >
                                                    Editor
                                                </option>
                                                <option
                                                    value="admin"
                                                    selected={
                                                        u.role === "admin"
                                                    }
                                                >
                                                    Admin
                                                </option>
                                            </select>
                                        ) : (
                                            u.role
                                        )}
                                    </td>
                                    <td className={style.buttons}>
                                        {roleEdit &&
                                        roleId === u._id &&
                                        u.role !== roleName ? (
                                            <span
                                                id={u._id}
                                                name={u.role}
                                                onClick={roleSubmit}
                                                className={
                                                    ((u.role === "superadmin" ||
                                                        u.role === "admin") &&
                                                        user.role ===
                                                            "admin") ||
                                                    u.email === user.email
                                                        ? style.disable
                                                        : style.edit
                                                }
                                            >
                                                <i
                                                    className={`${style.save} fa-solid fa-check`}
                                                ></i>
                                            </span>
                                        ) : (
                                            <span
                                                id={u._id}
                                                name={u.role}
                                                onClick={handleEdit}
                                                className={
                                                    ((u.role === "superadmin" ||
                                                        u.role === "admin") &&
                                                        user.role ===
                                                            "admin") ||
                                                    u.email === user.email
                                                        ? style.disable
                                                        : style.edit
                                                }
                                            >
                                                {roleEdit &&
                                                roleId === u._id ? (
                                                    <i
                                                        className={`${style.save} fa-solid fa-check`}
                                                    ></i>
                                                ) : (
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                )}
                                            </span>
                                        )}
                                        {roleEdit && roleId === u._id ? (
                                            <span
                                                onClick={handleCancle}
                                                className={
                                                    ((u.role === "superadmin" ||
                                                        u.role === "admin") &&
                                                        user.role ===
                                                            "admin") ||
                                                    u.email === user.email
                                                        ? style.disabledlt
                                                        : style.delete
                                                }
                                            >
                                                <i
                                                    className={`${style.close} fa-solid fa-xmark`}
                                                ></i>
                                            </span>
                                        ) : (
                                            <span
                                                id={u._id}
                                                onClick={handleDelete}
                                                className={
                                                    ((u.role === "superadmin" ||
                                                        u.role === "admin") &&
                                                        user.role ===
                                                            "admin") ||
                                                    u.email === user.email
                                                        ? style.disabledlt
                                                        : style.delete
                                                }
                                            >
                                                <i class="fa-solid fa-trash-can"></i>
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Admin;
