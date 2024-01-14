import React, { Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, RouterProvider, Routes } from "react-router-dom";
import { routerItem } from "./constants/pages";
import { Layout } from "./components/layout";
import { useAppSelector } from "./store";

function App() {
  return (
    <div className="App">
      <Fragment>
        <RouterProvider router={routerItem}></RouterProvider>
      </Fragment>
    </div>
  );
}

export default App;
