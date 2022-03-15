import InfoUpdate from "./InfoUpdate";
import PasswordUpdate from "./PasswordUpdate";

const EditAbleForm = ({
    handleChange,
    handleEditForm,
    handleSubmitPass,
    handleChangePass,
    handleType,
    inputStyle,
    users,
    user,
    type,
    changePass,
    errors,
}) => {
    return (
        <>
            {!changePass ? (
                <InfoUpdate
                    handleEditForm={handleEditForm}
                    errors={errors}
                    inputStyle={inputStyle}
                    handleChange={handleChange}
                    users={users}
                    user={user}
                    handleChangePass={handleChangePass}
                />
            ) : (
                <PasswordUpdate
                    handleSubmitPass={handleSubmitPass}
                    handleChangePass={handleChangePass}
                    errors={errors}
                    type={type}
                    handleChange={handleChange}
                    users={users}
                    inputStyle={inputStyle}
                    handleType={handleType}
                />
            )}
        </>
    );
};

export default EditAbleForm;
