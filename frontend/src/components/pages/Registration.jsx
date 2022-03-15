// external imports
import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// internal imports
import Form from "../form/Form";
import styles from "../../css/modules/Form.module.css";
import { useAuth } from "../../contextApi/context";
import { regValidation } from "../../validation/validation";

// type state for both Registration and Login
const typeChecker = {
  type: "password",
  ctype: "password",
};

// Type Reducer Function
const typeReducer = (state, action) => {
  switch (action.type) {
    case "typeText":
      return {
        ...state,
        type: "text",
      };
    case "typePassword":
      return {
        ...state,
        type: "password",
      };
    case "cTypeText":
      return {
        ...state,
        ctype: "text",
      };
    case "cTypePassword":
      return {
        ...state,
        ctype: "password",
      };
    default:
      return state;
  }
};

// Usefull state for Registration Page
const regState = {
  username: "",
  email: "",
  password: "",
  cpassword: "",
  mobile: "",
  agree: false,
  errorObj: {},
};

// Registration Reducer Function
const regReducer = (state, action) => {
  switch (action.type) {
    case "user":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "agree":
      return {
        ...state,
        [action.payload.name]: action.payload.check,
      };
    case "error":
      return { ...state, errorObj: action.errors };

    default:
      return state;
  }
};

// Registration Functional Componenet
const Registration = () => {
  // data's from context provider
  const { contextdispatch } = useAuth();

  // state management with useReducer
  const [state, dispatch] = useReducer(regReducer, regState);
  const [type, typeDispatch] = useReducer(typeReducer, typeChecker);

  // navigator
  const navigate = useNavigate();

  // Input on change handler
  const handleChange = (e) => {
    dispatch({
      type: "user",
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  // check input handler
  const handleAgree = (e) => {
    dispatch({
      type: "agree",
      payload: {
        name: e.target.name,
        check: e.target.checked,
      },
    });
  };

  // Registration response Function
  const regResponse = async (
    dispatch,
    navigate,
    user,
    contextdispatch,
    axios
  ) => {
    try {
      // set errors empty object first
      dispatch({ type: "error", errors: {} });
      // get the response by backend
      const response = await axios.post("/user/signup", JSON.stringify(user), {
        headers: {
          "Content-type": "application/json",
        },
      });
      // after  request check process make true for waiting for the response
      contextdispatch({ type: "check", result: true });
      // check if the data response fullfill
      if (response.data) {
        // set context provider
        contextdispatch({ type: "loading", result: false });
        contextdispatch({ type: "check", result: false });
        navigate("/emailVerify");
      }
    } catch (err) {
      // checking the server errors and other type of errors
      if (err.response) {
        const error = err.response.data.errors;
        const errorLength = Object.keys(error).length;

        for (let i = 0; i < errorLength; i++) {
          // set the error for notifying
          dispatch({
            type: "error",
            errors: {
              [Object.keys(error)[i]]: [
                Object.values(Object.values(error))[i].msg,
              ],
            },
          });
        }
        contextdispatch({ type: "loading", result: false });
        contextdispatch({ type: "check", result: false });
      }
    }
  };

  // form submiting handler function
  const submitHandler = async (e) => {
    // change the form default behaviour
    e.preventDefault();
    // distructuring value from state
    const { username, password, cpassword, email, mobile } = state;
    // create a user object
    const user = { username, email, password, mobile, cpassword };
    // input validator
    const { errors, isValid } = regValidation(state);
    // check all inputs are valid input
    if (isValid) {
      // set loading true
      contextdispatch({ type: "loading", result: true });
      // Registration operation in the backend by axios
      regResponse(dispatch, navigate, user, contextdispatch, axios);
    } else {
      // set all the error
      dispatch({ type: "error", errors: errors });
    }
  };

  // handle type for changing
  const handleType = (e) => {
    // target the input for checking which input type need to change
    const selector = e.target.parentElement.parentElement.firstChild;

    // checking proccess and change type
    if (type.type === "password" && selector.name === "password") {
      typeDispatch({ type: "typeText" });
    }
    if (type.type === "text" && selector.name === "password") {
      typeDispatch({ type: "typePassword" });
    }
    if (type.ctype === "password" && selector.name === "cpassword") {
      typeDispatch({ type: "cTypeText" });
    }
    if (type.ctype === "text" && selector.name === "cpassword") {
      typeDispatch({ type: "cTypePassword" });
    }
  };

  return (
    <div className={styles.formDiv}>
      <div className={styles.layer}>
        <h1>SignUp</h1>
        <Form
          handleChange={handleChange}
          checkHandler={handleAgree}
          submitHandler={submitHandler}
          handleType={handleType}
          errors={state.errorObj}
          type={type.type}
          ctype={type.ctype}
          user={state}
        />
      </div>
    </div>
  );
};

export default Registration;
