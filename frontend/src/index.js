import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./context/AuthContext";
import PostContextProvider from "./context/PostContext";
import UserContextProvider from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <PostContextProvider>
          <App />
        </PostContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
