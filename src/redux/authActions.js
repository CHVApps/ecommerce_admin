import { loginAdmin } from "../api";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const login = (email, password) => async (dispatch) => {
  try {
    const data = await loginAdmin(email, password);
    localStorage.setItem("token", data.token); // Store token in localStorage
    dispatch({ type: LOGIN_SUCCESS, payload: data.token });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error });
  }
};
