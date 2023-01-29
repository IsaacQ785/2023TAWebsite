import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./views/Root";
import Error from "./views/Error";
import HomePage from "./views/HomePage/HomePage";
import AnalysisPage from "./views/AnalysisPage/AnalysisPage";
import UserPage from "./views/User/UserPage";

const container = document.getElementById("app");
const root = createRoot(container!);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "analysis",
        element: <AnalysisPage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
