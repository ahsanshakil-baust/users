// Login form validation
const loginValidate = (state) => {
    let errors = {};
    // getting from user body or form body
    const { password, email } = state;

    // checking and pushing to the errors object
    if (!email && !password) {
        errors.common = "Please Fill all the fields";
    } else {
        if (!email) {
            errors.email = "email required!";
        }

        if (!password) {
            errors.password = "password required!";
        }
    }

    // returning errors and isValid true or false by checking errors keys length
    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};

// Registration form validation
const regValidation = (state) => {
    let errors = {};
    // getting from user body or form body
    const { username, password, cpassword, email, mobile, agree } = state;

    // checking and pushing to the errors object
    if (!username && !email && !mobile && !password && !cpassword && !agree) {
        errors.error = "Please Fill all the fields";
    } else {
        if (!username) {
            errors.username = "username required!";
        }

        if (!email) {
            errors.email = "email required!";
        }

        if (!mobile) {
            errors.mobile = "mobile required!";
        }

        if (!password) {
            errors.password = "password required!";
        }

        if (password !== cpassword) {
            errors.cpassword = "password do not match";
        }

        if (!agree) {
            errors.agreement = "must be checked!";
        }
    }

    // returning errors and isValid true or false by checking errors keys length
    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};

// Password changing form validation
const passChangeValidate = (state) => {
    let errors = {};
    // getting from user body or form body
    const { password, cpassword, vpassword } = state;

    // checking and pushing to the errors object
    if (!password || !cpassword || !vpassword) {
        errors.common = "Please Fill all the fields";
    }

    // returning errors and isValid true or false by checking errors keys length
    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};

// exporting module
module.exports = {
    loginValidate,
    regValidation,
    passChangeValidate,
};
