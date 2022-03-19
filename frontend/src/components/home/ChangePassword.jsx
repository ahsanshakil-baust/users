import Button from "../form/Button";
import styles from "../../css/modules/UpdatingForm.module.css";

const ChangePassword = ({
    users,
    handleChange,
    handleSubmitPass,
    handleType,
    errorText,
    type,
}) => {
    return (
        <form onSubmit={handleSubmitPass} className={styles.passwordDiv}>
            <p className={styles.errorClass}>{errorText.common}</p>

            <div className={styles.bioBox}>
                <label htmlFor="vpassword">Old Password</label>
                <input
                    onChange={handleChange}
                    type={type.vtype}
                    value={users.vpassword}
                    name="vpassword"
                    id="vpassword"
                    autoComplete="off"
                />
                <i onClick={handleType} className="fa-solid fa-key"></i>
            </div>
            <div className={styles.bioBox}>
                <label htmlFor="password">New Password</label>
                <input
                    onChange={handleChange}
                    type={type.type}
                    value={users.password}
                    name="password"
                    id="password"
                    autoComplete="off"
                />
                <i onClick={handleType} className="fa-solid fa-key"></i>
                <p className={styles.errorClass}>{errorText.password}</p>
            </div>
            <div className={styles.bioBox}>
                <label htmlFor="cpassword">Confirm New Password</label>
                <input
                    onChange={handleChange}
                    type={type.ctype}
                    name="cpassword"
                    value={users.cpassword}
                    id="cpassword"
                    autoComplete="off"
                />
                <i onClick={handleType} className="fa-solid fa-key"></i>
            </div>

            <div className={styles.bioBox}>
                <Button
                    className={styles.editSubmit}
                    type="submit"
                    text="Submit"
                />
            </div>
        </form>
    );
};

export default ChangePassword;
