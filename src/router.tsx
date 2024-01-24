import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "layout/AuthLayout";
import MainPage from "pages";
import AdminSignup from "pages/admin-auth/AdminSignup";
import AdminSignin from "pages/admin-auth/AdminSignin";
import AdministrationLayout from "layout/AdministrationLayout";

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
        ]
    },
    {
        path: "/admin",
        element: <AdministrationLayout />
    }
]);

export default router;