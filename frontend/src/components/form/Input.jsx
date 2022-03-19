import React from "react";

const Input = ({
    name,
    label,
    errorText,
    classes,
    errorClass,
    fw,
    handleType,
    iconHide,
    ...rest
}) => {
    if (name === "gender" || name === "agreement") {
        return (
            <div className={classes}>
                <input {...rest} name={name} id={name} />
                <label htmlFor={name}>{label}</label>
            </div>
        );
    }
    return (
        <div className={classes}>
            <input autoComplete="off" {...rest} name={name} id={name} />
            <i className={`fa-solid ${iconHide} ${fw}`}></i>
            {name === "password" ||
            name === "cpassword" ||
            name === "vpassword" ? (
                <div>
                    <i onClick={handleType} className="fa-solid fa-key"></i>
                </div>
            ) : null}
            <label htmlFor={name}>{label}</label>
            <p className={errorClass}>{errorText}</p>
            <span></span>
        </div>
    );
};

export default Input;
