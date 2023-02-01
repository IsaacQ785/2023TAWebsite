import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AnalysisHome from "./views/AnalysisPage/AnalysisHome";
import StockAnalysis from "./views/AnalysisPage/StockAnalysis";
import Error from "./views/Error";
import Root from "./views/Root";
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
        path: "analysis/",
        element: <AnalysisHome />,
        children: [
          {
            path: ":id",
            element: <StockAnalysis />,
          },
        ],
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
