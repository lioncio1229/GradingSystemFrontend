import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "layout/AuthLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />
    }
]);

export default router;