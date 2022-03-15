import Button from "../form/Button";

const ImageUploader = ({
    handleSubmit,
    previewSource,
    user,
    fileHandler,
    cancleHandle,
}) => {
    return (
        <div className="imageContainer">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {previewSource ? (
                    <img src={previewSource} alt="" />
                ) : (
                    <img src={user.avatar} alt="" />
                )}

                <div className="uploads">
                    <input
                        type="file"
                        name="avatar"
                        id="file"
                        onChange={fileHandler}
                        className="inputfile"
                    />
                    {previewSource ? (
                        <Button
                            className="uploadBtn"
                            onClick={cancleHandle}
                            text="cancle"
                        />
                    ) : (
                        <label htmlFor="file">Upload Image</label>
                    )}
                    <Button className="uploadBtn" text="submit" />
                </div>
            </form>
        </div>
    );
};

export default ImageUploader;
