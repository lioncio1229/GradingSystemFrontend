import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "layout/AuthLayout";
import MainPage from "pages";
import AdminSignup from "pages/admin-auth/AdminSignup";
import AdminSignin from "pages/admin-auth/AdminSignin";
import AdministrationLayout from "layout/AdministrationLayout";
import AdminPortal from "pages/admin-portal";
import Subjects from "pages/admin-portal/subjects";
import Students from "pages/admin-portal/students";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/",
                element: <MainPage />
            },
            {
                path: "/admin/signup",
                element: <AdminSignup />
            },
            {
                path: "/admin/signin",
                element: <AdminSignin />
            }
        ],
    },
    {
        path: "/admin",
        element: <AdministrationLayout />,
        children: [
            {
                path: "portal",
                element: <AdminPortal />,
                 children: [
                    {
                        path: "",
                        element: <Subjects />
                    },
                    {
                        path: "students",
                        element: <Students />
                    },
                ]
            }
        ]
    }
]);

export default router;