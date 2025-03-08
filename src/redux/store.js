import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; // Ensure correct import
import authReducer from "./authReducer";

const store = createStore(
  authReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
