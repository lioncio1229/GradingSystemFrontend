import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "layout/AuthLayout";
import MainPage from "pages";
import AdminSignup from "pages/admin-auth/AdminSignup";
import AdminSignin from "pages/admin-auth/AdminSignin";
import AdministrationLayout from "layout/administration-layout";
import AdminPortal from "pages/admin-portal";
import Subjects from "pages/admin-portal/subjects";
import Students from "pages/admin-portal/students";
import Teachers from "pages/admin-portal/teachers";
import Lectures from "pages/admin-portal/lectures";
import ManageUsers from "pages/admin-portal/user-management";

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
                    {
                        path: "teachers",
                        element: <Teachers />
                    },
                    {
                        path: "lectures",
                        element: <Lectures />
                    },
                    {
                        path: "users",
                        element: <ManageUsers />
                    },
                ]
            }
        ]
    }
]);

export default router;