import Button from "./Button";
import Input from "./Input";
import styles from "../../css/modules/Button.module.css";
import inputStyle from "../../css/modules/Input.module.css";
import { Link } from "react-router-dom";

const LoginForm = ({
    user,
    errors,
    type,
    handleChange,
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

            <div className={inputStyle.letter}>
                <span>
                    Don't have an account ?
                    <Link className={inputStyle.Link} to="/register">
                        SignUp
                    </Link>
                </span>
            </div>

            <div className={inputStyle.buttonDiv}>
                <Button text="Login" className={styles.submit} />
            </div>
        </form>
    );
};

export default LoginForm;
