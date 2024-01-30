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
import FacultyPortal from "pages/faculty-portal";
import Grades from "pages/faculty-portal/grades";
import FacultySubjects from "pages/faculty-portal/faculty-subjects";
import FacultyLectures from "pages/faculty-portal/faculty-lectures";
import StudentSignin from "pages/student-auth/StudentSignin";
import StudentSignup from "pages/student-auth/StudentSignup";

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
            },
            {
                path: "/student/signin",
                element: <StudentSignin />
            },
            {
                path: "/student/signup",
                element: <StudentSignup />
            },
        ],
    },
    {
        path: "/portal",
        element: <AdministrationLayout />,
        children: [
            {
                path: "admin",
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
            },
            {
                path: "faculty",
                element: <FacultyPortal />,
                children: [
                    {
                        path: "",
                        element: <Grades />
                    },
                    {
                        path: "lectures",
                        element: <FacultyLectures />
                    },
                    {
                        path: "subjects",
                        element: <FacultySubjects />
                    },
                ]
            }
        ]
    }
]);

export default router;