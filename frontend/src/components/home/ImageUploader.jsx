import styles from "../../css/modules/ImageProfile.module.css";

const ImageUploader = ({
    handleSubmit,
    previewSource,
    user,
    fileHandler,
    cancleHandle,
}) => {
    return (
        <div className={styles.imageContainer}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {previewSource ? (
                    <img src={previewSource} alt="" />
                ) : (
                    <img src={user.avatar} alt="" />
                )}

                <div className={styles.uploads}>
                    <input
                        type="file"
                        name="avatar"
                        id="file"
                        onChange={fileHandler}
                        className={styles.inputfile}
                    />
                    {previewSource ? (
                        <>
                            <span
                                className={styles.cancleBtn}
                                onClick={cancleHandle}
                            >
                                <i class="fa-solid fa-xmark"></i>
                            </span>

                            <button type="submit" className={styles.uploadBtn}>
                                <i class="fa-solid fa-check"></i>
                            </button>
                        </>
                    ) : (
                        <label htmlFor="file">
                            <i class="fa-solid fa-camera"></i>
                        </label>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ImageUploader;
