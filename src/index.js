import React from "react";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Sidebar from "./components/layout/sidebar";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { store } from "./state/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <BrowserRouter>
          <div className="h-screen w-full flex">
            <Sidebar />
            <div className="flex flex-col w-full">
              <Navbar />
              <App />
            </div>
          </div>

          {/*
           */}
        </BrowserRouter>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
