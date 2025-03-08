import { LOGIN_SUCCESS, LOGIN_FAIL } from "./authActions";

const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload, isAuthenticated: true, error: null };
    case LOGIN_FAIL:
      return { ...state, token: null, isAuthenticated: false, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
