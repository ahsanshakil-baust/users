// external imports
import React, { useReducer } from "react";
import axios from "axios";

// internal imports
import styles from "../../css/modules/Form.module.css";
import LoginForm from "../form/LoginForm";
import { useAuth } from "../../contextApi/context";
import { loginResponse } from "../api/response";
import { loginValidate } from "../../validation/validation";

// Usefull state for Login Page
const loginState = {
  email: "",
  password: "",
  errorObj: {},
};

// Login Reducer Function
const loginhReducer = (state, action) => {
  switch (action.type) {
    case "user":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "error":
      return { ...state, errorObj: action.errors };

    default:
      return state;
  }
};

// type state for both Registration and Login
const typeChecker = {
  type: "password",
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
    default:
      return state;
  }
};

// Login Functional Componenet
const Login = () => {
  // data's from context provider
  const { contextdispatch } = useAuth();

  // state management with useReducer
  const [state, dispatch] = useReducer(loginhReducer, loginState);
  const [type, typeDispatch] = useReducer(typeReducer, typeChecker);

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

  // Login response Function
  const loginResponse = async (dispatch, user, contextdispatch, axios) => {
    try {
      // set errors empty object first
      dispatch({ type: "error", errors: {} });
      // get the response by backend
      const response = await axios.post("/user/login", JSON.stringify(user), {
        headers: {
          "Content-type": "application/json",
        },
      });
      // after  request check process make true for waiting for the response
      contextdispatch({ type: "check", result: true });
      // check if the data response fullfill
      if (response.data) {
        // set user to the context provider
        contextdispatch({ type: "user", result: response.data.user });
        contextdispatch({ type: "loading", result: false });
        contextdispatch({ type: "check", result: false });
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
      }
      contextdispatch({ type: "loading", result: false });
      contextdispatch({ type: "check", result: false });
    }
  };

  // form submiting handler function
  const submitHandler = async (e) => {
    // change the form default behaviour
    e.preventDefault();
    // distructuring value from state
    const { email, password } = state;
    // create a user object
    const user = { email, password };
    console.log(user);
    // input validator
    const { isValid, errors } = loginValidate(state);
    // check all inputs are valid input
    if (isValid) {
      // set loading true
      contextdispatch({ type: "loading", result: true });
      // login operation in the backend by axios
      loginResponse(dispatch, user, contextdispatch, axios);
    } else {
      // set all the error
      dispatch({ type: "error", errors: errors });
    }
  };

  // handle type for changing
  const handleType = () => {
    if (type.type === "password") {
      typeDispatch({ type: "typeText" });
    }
    if (type.type === "text") {
      typeDispatch({ type: "typePassword" });
    }
  };

  return (
    <div className={styles.formDiv}>
      <div className={styles.layer}>
        <h1>Login</h1>
        <LoginForm
          handleChange={handleChange}
          submitHandler={submitHandler}
          handleType={handleType}
          errors={state.errorObj}
          type={type.type}
          user={state}
        />
      </div>
    </div>
  );
};

export default Login;
