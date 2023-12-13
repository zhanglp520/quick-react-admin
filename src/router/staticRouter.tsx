import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import layout from "@/layout/index";

const staticRouter: RouteObject[] = [
    {
        path: "/",
        Component: layout,
        children: [{
            path: "/home",
            // Component: lazy(() => import("@/pages/404"))
            Component: lazy(() => import("@/views/home"))
            // Component: lazy(() => import("@/views/system/user"))
        }]
    },
    {
        path: "/system",
        Component: layout,
        children: [{
            path: "/system/user",
            Component: lazy(() => import("@/views/system/user"))
        }]
    },
    // {
    //     path:'/',
    //     element: <Navigate to="/login" />,
    // },
    {
        path: "/login",
        Component: lazy(() => import("@/pages/login"))
    },
    {
        path: "/personalInfo",
        Component: layout,
        // element: <Navigate to="/personalInfo" />,
        children: [
            {
                path: "/personalInfo/index",
                Component: lazy(() => import("@/views/personalInfo"))
            }
        ]
    },
    {
        path: "/changePassword",
        Component: layout,
        // element: <Navigate to="/changePassword" />,
        children: [
            {
                path: "/changePassword/index",
                Component: lazy(() => import("@/views/changePassword"))
            }
        ]
    },
    {
        path: "/:catchAll(.*)",
        Component: lazy(() => import("@/pages/404"))
    }
];
export default staticRouter;
