// external imports
import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";

// create context
const DataContext = React.createContext();
//  exports all data by context
export const useAuth = () => {
  return useContext(DataContext);
};

// Usefull state for Context
const contextStates = {
  user: {},
  check: true,
  loading: true,
  loggedIn: false,
};

// ontext Reducer Function
const contextReducer = (state, action) => {
  switch (action.type) {
    case "user":
      return { ...state, user: action.result };
    case "check":
      return { ...state, check: action.result };
    case "loading":
      return { ...state, loading: action.result };
    case "loggedIn":
      return { ...state, loggedIn: action.result };
    default:
      return state;
  }
};

// Data provider
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contextReducer, contextStates);
  // life-cyle hook
  useEffect(() => {
    const data = axios
      .get("/user", {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: "user", result: res.data.user });
        dispatch({ type: "loading", result: false });
        dispatch({ type: "check", result: false });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "loading", result: false });
        dispatch({ type: "check", result: false });
      });

    return data;
  }, []);
  // life-cyle hook
  useEffect(() => {
    if (state.user && state.user.isVerify) {
      dispatch({ type: "loggedIn", result: true });
    } else {
      dispatch({ type: "loggedIn", result: false });
    }
  }, [state.user]);
  // logout function
  const logOut = () => {
    dispatch({ type: "loading", result: true });
    fetch("/user/logout", {
      method: "DELETE",
    })
      .then(() => {
        dispatch({ type: "user", result: {} });
        dispatch({ type: "loading", result: false });
      })
      .catch((err) => console.log(err));
  };

  return (
    // data provider
    <DataContext.Provider
      value={{
        user: state.user,
        logOut,
        loggedIn: state.loggedIn,
        check: state.check,
        loading: state.loading,
        contextdispatch: dispatch,
      }}
    >
      {!state.check && children}
    </DataContext.Provider>
  );
};
