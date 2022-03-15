import Input from "../form/Input";
import Button from "../form/Button";

const PasswordUpdate = ({
    handleSubmitPass,
    handleChangePass,
    errors,
    type,
    handleChange,
    users,
    inputStyle,
    handleType,
}) => {
    return (
        <form onSubmit={handleSubmitPass} className="changePassDiv">
            <Button
                type="button"
                onClick={handleChangePass}
                className="closeFixedPosition"
                text="close"
            />

            {errors.common ? (
                <p className="passError">{errors.common}</p>
            ) : null}

            <Input
                classes="passChanger"
                type={type.vtype}
                name="vpassword"
                label="Enter your old Password"
                onChange={handleChange}
                value={users.vpassword}
                errorClass={inputStyle.error}
                errorText={errors.password}
                handleType={handleType}
            />
            <Input
                classes="passChanger"
                type={type.type}
                name="password"
                label="Password"
                onChange={handleChange}
                value={users.password}
                errorClass={inputStyle.error}
                errorText={errors.password}
                handleType={handleType}
            />
            <Input
                classes="passChanger"
                type={type.ctype}
                name="cpassword"
                label="Confirm Password"
                onChange={handleChange}
                value={users.cpassword}
                errorClass={inputStyle.error}
                errorText={errors.cpassword}
                handleType={handleType}
            />
            <Button className="uploadBtn formBtn" text="submit" type="submit" />
        </form>
    );
};

export default PasswordUpdate;
