import React from "react";
import ReactDOM from "react-dom/client";
import "./style.scss";
import "./style.responsive.scss";
import App from "./App";

import { ContextApp } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextApp>
      <App />
    </ContextApp>
  </React.StrictMode>
);
