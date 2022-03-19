import Button from "./Button";
import Input from "./Input";
import styles from "../../css/modules/Button.module.css";
import inputStyle from "../../css/modules/Input.module.css";
import { Link } from "react-router-dom";

const Form = ({
    user,
    errors,
    type,
    ctype,
    handleChange,
    checkHandler,
    submitHandler,
    handleType,
}) => {
    return (
        <form
            onSubmit={submitHandler}
            style={{ width: "80%", margin: "auto", position: "relative" }}
        >
            {/* showing common errors */}
            {errors ? (
                <p className={inputStyle.errorCommon}>{errors.common}</p>
            ) : null}

            <Input
                classes={inputStyle.input}
                type="text"
                name="username"
                label="Username"
                onChange={handleChange}
                value={user.username}
                errorClass={inputStyle.error}
                errorText={errors.username}
                fw="fa-user"
                iconHide={inputStyle.iconHide}
            />

            <Input
                classes={inputStyle.input}
                type="text"
                name="email"
                label="Email"
                onChange={handleChange}
                value={user.email}
                errorClass={inputStyle.error}
                errorText={errors.email}
                fw="fa-envelope"
                iconHide={inputStyle.iconHide}
            />

            <Input
                classes={inputStyle.input}
                type="text"
                name="mobile"
                label="Mobile Number"
                onChange={handleChange}
                value={user.mobile}
                errorClass={inputStyle.error}
                errorText={errors.mobile}
                fw="fa-phone"
                iconHide={inputStyle.iconHide}
            />

            <Input
                classes={inputStyle.input}
                type={type}
                name="password"
                label="Password"
                onChange={handleChange}
                value={user.password}
                errorClass={inputStyle.error}
                errorText={errors.password}
                fw="fa-lock"
                handleType={handleType}
                iconHide={inputStyle.iconHide}
            />

            <Input
                classes={inputStyle.input}
                type={ctype}
                name="cpassword"
                label="Confirm Password"
                onChange={handleChange}
                value={user.cpassword}
                errorClass={inputStyle.error}
                errorText={errors.cpassword}
                fw="fa-lock"
                handleType={handleType}
                iconHide={inputStyle.iconHide}
            />

            <div className={inputStyle.genderDiv}>
                <Input
                    classes={inputStyle.check}
                    type="checkbox"
                    name="agree"
                    label="I accept all terms and conditions"
                    onChange={checkHandler}
                    checked={user.agree}
                />
                <p className={inputStyle.errorCommon}>{errors.agreement}</p>
            </div>

            <div className={inputStyle.letter}>
                <span>
                    Already have an account ?
                    <Link className={inputStyle.Link} to="/login">
                        Sign In
                    </Link>
                </span>
            </div>

            <div className={inputStyle.buttonDiv}>
                <Button text="Create a new Account" className={styles.submit} />
            </div>
        </form>
    );
};

export default Form;
