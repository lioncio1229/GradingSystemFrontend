import { RouterProvider } from "react-router-dom";
import router from "router";
import ShowErrorModal from "common/ShowErrorModal";

export default function App()
{
    return (
        <>
            <ShowErrorModal />
            <RouterProvider router={router} />
        </>
    )
}