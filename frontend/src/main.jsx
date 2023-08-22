import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./reset.css";
import "./index.scss";
import { BlogsContextProvider } from "./context/BlogContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BlogsContextProvider>
      <App />
    </BlogsContextProvider>
  </React.StrictMode>
);
