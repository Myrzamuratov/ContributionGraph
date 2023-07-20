import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import DateContextProvider from "./context/DateContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DateContextProvider>
    <App />
  </DateContextProvider>
);
