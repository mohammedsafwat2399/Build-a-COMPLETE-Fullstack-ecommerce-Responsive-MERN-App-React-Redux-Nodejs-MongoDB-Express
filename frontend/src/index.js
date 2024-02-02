import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {  HelmetProvider } from 'react-helmet-async';
import { Provider } from "react-redux";
import Store from "./redux";
import "./index.css";
import App from "./App";
 import Menu from "./page/Menu";
 import Home from "./page/Home";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import Cart from "./page/Cart";
import NewProdect from "./page/NewProdect";
import Success from "./page/Success";
import Cancel from "./page/Cancel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
       { path: "menu/:filterby", element: <Menu /> },
       { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "newprodect", element: <NewProdect /> },
      { path: "cart", element: <Cart /> },
      { path: "cancel", element: <Cancel /> },
      { path: "success", element: <Success /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <HelmetProvider>
    <RouterProvider router={router} />
     </HelmetProvider>
  </Provider>
);
