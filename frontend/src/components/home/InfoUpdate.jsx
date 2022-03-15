import Input from "../form/Input";
import Button from "../form/Button";

const InfoUpdate = ({
    handleEditForm,
    errors,
    inputStyle,
    handleChange,
    users,
    user,
    handleChangePass,
}) => {
    return (
        <form
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
            onSubmit={handleEditForm}
        >
            {errors ? (
                <p className={inputStyle.errorCommon}>{errors.common}</p>
            ) : null}

            <Input
                classes="inputChanger"
                type="text"
                name="username"
                label="Username"
                onChange={handleChange}
                value={users.username}
                errorClass={inputStyle.error}
                errorText={errors.username}
            />
            <div className="bioBox">
                <div className="title">Email : </div>
                <div className="desc">{user.email}</div>
            </div>
            <Input
                classes="inputChanger"
                type="text"
                name="mobile"
                label="Mobile Number"
                onChange={handleChange}
                value={users.mobile}
                errorClass={inputStyle.error}
                errorText={errors.mobile}
            />
            <Button className="uploadBtn" text="submit" type="submit" />
            <Button
                type="button"
                onClick={handleChangePass}
                className="uploadBtn formBtn"
                text="change your password"
            />
        </form>
    );
};

export default InfoUpdate;
