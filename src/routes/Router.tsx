import  { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layout/full-layout/loadable/Loadable";

const FullLayout = Loadable(lazy(() => import("../layout/full-layout/FullLayout")));
const BlankLayout = Loadable(
  lazy(() => import("../layout/plain-layout/PlainLayout"))
);

const Error = Loadable(lazy(() => import('../pages/authentication/Error')));

const ExAlert = Loadable(lazy(() => import("../pages/alert/Alert")));

const Router = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: "/", element: <Navigate to="/alert" /> },
      { path: "/alert", element: <ExAlert /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "auth",
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
