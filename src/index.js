import React from "react";
import { createRoot } from "react-dom/client"; // ✅ Use createRoot for React 18+
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

const root = createRoot(document.getElementById("root")); // ✅ Use createRoot instead of render()

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
