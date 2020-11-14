import React, { useReducer } from "react";
import clienteAxios from "../../../config/axios";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

import {
  REGISTER_SUCESS,
  GET_USER,
  REGISTER_ERROR,
  CLOSE_SNACKBAR,
} from "../../../types";
import tokenAuth from "../../../config/token";
const UserState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    authenticated: null,
    user: null,
    msg: null,
    error: false,
    severity: "",
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const registerUser = async (date) => {
    try {
      const response = await clienteAxios.post("/api/usuarios", date);
      console.log(response);
      dispatch({
        type: REGISTER_SUCESS,
        payload: response.data,
      });
      authenticatedUser();
    } catch (error) {
      ShowError(error.response.data.errors[0].msg)
    }
  };

  const authenticatedUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get("/api/auth");
      dispatch({
        type: GET_USER,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const ShowError = (msg) => {

    dispatch({
      type: REGISTER_ERROR,
      payload: msg
    });
  };

  const closeError = () => {
    dispatch({
      type: CLOSE_SNACKBAR,
    });
  }
  return (
    <UserContext.Provider
      value={{
        token: state.token,
        user: state.user,
        authenticated: state.authenticated,
        error: state.error,
        msg: state.msg,
        severity: state.severity,
        registerUser,
        ShowError,
        closeError
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
