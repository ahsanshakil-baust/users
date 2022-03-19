/* eslint-disable no-lone-blocks */
import React, { useReducer, useState } from "react";
import Button from "../form/Button";
import ImageUploader from "../home/ImageUploader";
import UpdatingForm from "../home/UpdatingForm";
import { passChangeValidate } from "../../validation/validation";
import axios from "axios";
import { useAuth } from "../../contextApi/context";
import ChangePassword from "../home/ChangePassword";
import styles from "../../css/modules/Profile.module.css";

// type state for both Registration and Login
const typeChecker = {
    type: "password",
    ctype: "password",
    vtype: "password",
};

// Type Reducer Function
const typeReducer = (state, action) => {
    switch (action.type) {
        case "typeText":
            return {
                ...state,
                type: action.result,
            };
        case "cTypeText":
            return {
                ...state,
                ctype: action.result,
            };
        case "vTypeText":
            return {
                ...state,
                vtype: action.result,
            };
        default:
            return state;
    }
};

const Home = ({ user }) => {
    // data's from context provider
    const { contextdispatch } = useAuth();
    // all states
    const [previewSource, setPreviewSource] = useState();
    const [edit, setEdit] = useState(true);
    const [changePass, setChangePass] = useState(false);
    const [errors, setErros] = useState({});
    const [users, setUser] = useState({
        username: user.username,
        mobile: user.mobile,
        district: "",
        post: "",
        address: "",
        about: "",
        vpassword: "",
        password: "",
        cpassword: "",
    });
    const [type, typeDispatch] = useReducer(typeReducer, typeChecker);

    // cancle preview before upload
    const cancleHandle = () => {
        setPreviewSource(null);
        window.location.reload(false);
    };

    // file onChange handler
    const fileHandler = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    };

    // Preview file function
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    // editing controller
    const handleEdit = () => {
        if (edit) {
            setEdit(false);
        } else {
            window.location.reload(false);
            setEdit(true);
        }
    };

    // change controller
    const handleChangePass = () => {
        if (changePass) {
            setChangePass(false);
            setErros({});
        } else {
            setChangePass(true);
            setErros({});
        }
    };

    // input form onchange handler
    const handleChange = (e) => {
        setUser({ ...users, [e.target.name]: e.target.value });
        console.log(user);
    };

    // submit handler function
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!previewSource) return;
        // after check preview if preview true or have then call uploadImage function
        uploadImage(previewSource);
    };

    // Uploading image or file api request
    const uploadImage = async (base64EncodedImage) => {
        try {
            await fetch("user/update", {
                method: "POST",
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { "Content-type": "application/json" },
            });

            alert("image uploaded successfully!");
            setPreviewSource(null);
        } catch (err) {
            console.log(err);
        }
        window.location.reload();
    };

    // User updating response Function
    const userUpdate = async (userObject, passTrue) => {
        try {
            setErros({});
            await axios.post("/user/update", JSON.stringify(userObject), {
                headers: {
                    "Content-type": "application/json",
                },
            });

            alert("user info updated successfully!");

            if (passTrue) {
                contextdispatch({ type: "user", result: {} });
            }
            setPreviewSource(null);
        } catch (err) {
            // checking the server errors and other type of errors
            if (err.response) {
                const error = err.response.data.errors;
                const errorLength = Object.keys(error).length;

                console.log(error);

                for (let i = 0; i < errorLength; i++) {
                    // set the error for notifying
                    setErros({
                        [Object.keys(error)[i]]: [
                            Object.values(Object.values(error))[i].msg,
                        ],
                    });
                }
            }
        }
    };

    // edit form handler function to submit updates
    const handleEditForm = (e) => {
        e.preventDefault();
        const { username, mobile, district, post, address, about } = users;

        const userObject = { username, mobile, district, post, address, about };

        userUpdate(userObject, false);
        window.location.reload(false);
    };

    const handleSubmitPass = (e) => {
        e.preventDefault();
        const { password, cpassword, vpassword } = users;

        let userObject = { password, cpassword, vpassword };

        const { errors, isValid } = passChangeValidate(users);

        if (isValid) {
            userUpdate(userObject, true);
        } else {
            setErros(errors);
            console.log(errors);
        }
    };

    // handle type for changing
    const handleType = (e) => {
        // target the input for checking which input type need to change
        const selector = e.target.parentElement.children[1];

        // checking proccess and change type
        if (selector.name === "password") {
            type.type === "password"
                ? typeDispatch({ type: "typeText", result: "text" })
                : typeDispatch({ type: "typeText", result: "password" });
        }

        if (selector.name === "cpassword") {
            type.ctype === "password"
                ? typeDispatch({ type: "cTypeText", result: "text" })
                : typeDispatch({ type: "cTypeText", result: "password" });
        }

        if (selector.name === "vpassword") {
            type.vtype === "password"
                ? typeDispatch({ type: "vTypeText", result: "text" })
                : typeDispatch({ type: "vTypeText", result: "password" });
        }
    };

    return (
        <div className={styles.profileDiv}>
            <div className={styles.background}></div>
            {!changePass && (
                <div className={styles.imageDiv}>
                    <div className={styles.imageLayer}>
                        <ImageUploader
                            handleSubmit={handleSubmit}
                            previewSource={previewSource}
                            user={user}
                            fileHandler={fileHandler}
                            cancleHandle={cancleHandle}
                        />

                        <div className={styles.username}>{user.username}</div>
                        <div className={styles.email}>Email: {user.email}</div>
                        <div className={styles.role}>
                            user role: {user.role}
                        </div>

                        <Button
                            className={styles.passBtn}
                            onClick={handleChangePass}
                            text="Change Your Password"
                        />
                    </div>
                </div>
            )}

            <div className={styles.fromContainer}>
                {!changePass ? (
                    <Button
                        className={styles.editBtn}
                        onClick={handleEdit}
                        text={!edit ? "Cancle" : "Edit Profile"}
                    />
                ) : (
                    <Button
                        className={styles.editBtn}
                        onClick={handleChangePass}
                        text="Cancle"
                    />
                )}
                {changePass ? (
                    <ChangePassword
                        handleSubmitPass={handleSubmitPass}
                        handleChange={handleChange}
                        users={users}
                        errorText={errors}
                        handleType={handleType}
                        type={type}
                    />
                ) : (
                    <UpdatingForm
                        handleEditForm={handleEditForm}
                        handleChange={handleChange}
                        users={users}
                        user={user}
                        edit={edit}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
