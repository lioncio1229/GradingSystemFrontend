import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "layout/AuthLayout";
import MainPage from "pages";
import AdminSignup from "pages/admin-auth/AdminSignup";
import AdminSignin from "pages/admin-auth/AdminSignin";

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
    }
]);

export default router;