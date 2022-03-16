import React, { useReducer, useState } from "react";
import Button from "../form/Button";
import inputStyle from "../../css/modules/Input.module.css";
import ImageUploader from "../home/ImageUploader";
import EditAbleForm from "../home/EditAbleForm";
import NonEditAbleForm from "../home/NonEditableForm";
import { passChangeValidate } from "../../validation/validation";
import axios from "axios";
import { useAuth } from "../../contextApi/context";

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
                type: "text",
            };
        case "typePassword":
            return {
                ...state,
                type: "password",
            };
        case "cTypeText":
            return {
                ...state,
                ctype: "text",
            };
        case "cTypePassword":
            return {
                ...state,
                ctype: "password",
            };
        case "vTypeText":
            return {
                ...state,
                vtype: "text",
            };
        case "vTypePassword":
            return {
                ...state,
                vtype: "password",
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
    const [edit, setEdit] = useState(false);
    const [changePass, setChangePass] = useState(false);
    const [errors, setErros] = useState({});
    const [users, setUser] = useState({
        username: user.username,
        mobile: user.mobile,
        vpassword: "",
        password: "",
        cpassword: "",
    });
    const [type, typeDispatch] = useReducer(typeReducer, typeChecker);

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

    // cancle preview before upload
    const cancleHandle = () => {
        setPreviewSource(null);
    };

    // editing controller
    const handleEdit = () => {
        if (edit) {
            setEdit(false);
        } else {
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
    const userUpdate = async (userObject) => {
        try {
            setErros({});
            const result = await axios.post(
                "/user/update",
                JSON.stringify(userObject),
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            );

            alert("user info updated successfully!");

            console.log(result);

            setPreviewSource(null);
        } catch (err) {
            // checking the server errors and other type of errors
            if (err.response) {
                const error = err.response.data.errors;
                const errorLength = Object.keys(error).length;

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
        const { username, mobile } = users;

        let userObject = {};

        if (username) {
            userObject = {
                username,
            };
        }
        if (mobile) {
            userObject = {
                mobile,
            };
        }
        if (username && mobile) {
            userObject = {
                username,
                mobile,
            };
        }

        userUpdate(userObject);
        window.location.reload();
    };

    const handleSubmitPass = (e) => {
        e.preventDefault();
        const { password, cpassword, vpassword } = users;

        let userObject = { password, cpassword, vpassword };

        const { errors, isValid } = passChangeValidate(users);

        if (isValid) {
            userUpdate(userObject);
            contextdispatch({ type: "user", result: {} });
        } else {
            setErros(errors);
        }
    };

    // handle type for changing
    const handleType = (e) => {
        // target the input for checking which input type need to change
        const selector = e.target.parentElement.parentElement.firstChild;

        // checking proccess and change type
        if (type.type === "password" && selector.name === "password") {
            typeDispatch({ type: "typeText" });
        }
        if (type.type === "text" && selector.name === "password") {
            typeDispatch({ type: "typePassword" });
        }
        if (type.ctype === "password" && selector.name === "cpassword") {
            typeDispatch({ type: "cTypeText" });
        }
        if (type.ctype === "text" && selector.name === "cpassword") {
            typeDispatch({ type: "cTypePassword" });
        }
        if (type.vtype === "password" && selector.name === "vpassword") {
            typeDispatch({ type: "vTypeText" });
        }
        if (type.vtype === "text" && selector.name === "vpassword") {
            typeDispatch({ type: "vTypePassword" });
        }
    };

    return (
        <div className="profileDiv">
            <ImageUploader
                handleSubmit={handleSubmit}
                previewSource={previewSource}
                user={user}
                fileHandler={fileHandler}
                cancleHandle={cancleHandle}
            />

            <div className="fromContainer">
                <Button
                    className="editBtn"
                    onClick={handleEdit}
                    text={edit ? "cancle" : "edit"}
                />
                {edit ? (
                    <EditAbleForm
                        handleSubmitPass={handleSubmitPass}
                        handleChange={handleChange}
                        handleEditForm={handleEditForm}
                        handleChangePass={handleChangePass}
                        handleType={handleType}
                        inputStyle={inputStyle}
                        users={users}
                        user={user}
                        type={type}
                        changePass={changePass}
                        errors={errors}
                    />
                ) : (
                    <NonEditAbleForm user={user} />
                )}
            </div>
        </div>
    );
};

export default Home;
