import Button from "../form/Button";
import styles from "../../css/modules/UpdatingForm.module.css";

const NonEditAbleForm = ({
    users,
    user,
    edit,
    handleEditForm,
    handleChange,
}) => {
    return (
        <form onSubmit={handleEditForm} className={styles.infoDiv}>
            <div className={styles.bioBox}>
                <label htmlFor="username">Username</label>
                <input
                    onChange={handleChange}
                    type="text"
                    value={users.username}
                    name="username"
                    id="username"
                    autoComplete="off"
                    disabled={edit}
                />
            </div>
            <div className={styles.bioBox}>
                <label htmlFor="mobile">Mobile</label>
                <input
                    onChange={handleChange}
                    type="text"
                    value={users.mobile}
                    name="mobile"
                    id="mobile"
                    disabled={edit}
                />
            </div>

            <div className={styles.bioBox}>
                <label htmlFor="district">District</label>
                <input
                    onChange={handleChange}
                    type="text"
                    value={users.district}
                    name="district"
                    id="district"
                    placeholder="District"
                    disabled={edit}
                />
            </div>
            <div className={styles.bioBox}>
                <label htmlFor="post">Post Office</label>
                <input
                    onChange={handleChange}
                    type="text"
                    value={users.post}
                    name="post"
                    id="post"
                    placeholder="Post Office"
                    disabled={edit}
                />
            </div>
            <div className={styles.addressBox}>
                <label htmlFor="address">Address</label>
                <input
                    onChange={handleChange}
                    type="text"
                    value={users.address}
                    name="address"
                    placeholder="Home Address"
                    id="address"
                    disabled={edit}
                />
            </div>
            <div className={styles.addressBox}>
                <label htmlFor="about">About Me</label>
                <textarea
                    onChange={handleChange}
                    value={users.about}
                    name="about"
                    id="about"
                    placeholder="Write something about you..."
                    rows="4"
                    cols="50"
                    disabled={edit}
                />
            </div>

            {!edit && (
                <div className={styles.bioBox}>
                    <Button
                        className={styles.editSubmit}
                        type="submit"
                        text="Submit"
                    />
                </div>
            )}
        </form>
    );
};

export default NonEditAbleForm;
