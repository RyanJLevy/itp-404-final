import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import ErrorBoundary from "./routes/ErrorBoundary";
import Home from "./routes/Home";
import { fetchAllTechniques, fetchTechniqueBySlug } from "./api/techniques";
import Details from "./routes/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader() {
          return fetchAllTechniques();
        },
      },
      {
        path: "/details/:techniqueSlug",
        element: <Details />,
        loader({ params }) {
          return fetchTechniqueBySlug(params.techniqueSlug);
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
