import Button from "../form/Button";
import styles from "../../css/modules/UpdatingForm.module.css";

const ChangePassword = ({ users, handleChange, handleSubmitPass }) => {
    return (
        <form onSubmit={handleSubmitPass} className={styles.passwordDiv}>
            <div className={styles.bioBox}>
                <label htmlFor="vpassword">Old Password</label>
                <input
                    onChange={handleChange}
                    type="password"
                    value={users.vpassword}
                    name="vpassword"
                    id="vpassword"
                    autoComplete="off"
                />
            </div>
            <div className={styles.bioBox}>
                <label htmlFor="password">New Password</label>
                <input
                    onChange={handleChange}
                    type="password"
                    value={users.password}
                    name="password"
                    id="password"
                    autoComplete="off"
                />
            </div>
            <div className={styles.bioBox}>
                <label htmlFor="cpassword">Confirm New Password</label>
                <input
                    onChange={handleChange}
                    type="password"
                    name="cpassword"
                    value={users.cpassword}
                    id="cpassword"
                    autoComplete="off"
                />
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
