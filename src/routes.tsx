import { routes } from "@/lib/constants/routes"
import { createBrowserRouter } from "react-router-dom"
import { AppLayout } from "./pages/app/_layout/app-layout"
import { HomePage } from "./pages/app/home/home-page"
import { AuthLayout } from "./pages/auth/_layout/auth-layout"
import { SignInPage } from "./pages/auth/sign-in/sign-in-page"
import { StudentPage } from "./pages/app/students/index/page"
import { SubjectsPage } from "./pages/app/subjects/index/page"
import { CoursePage } from "./pages/app/courses/index/page"
import { TeacherPage } from "./pages/app/teachers/index/page"
import { BeaconPage } from "./pages/app/beacons/index/page"
import { SchoolCallPage } from "./pages/app/school-call/index/page"
import { UsersPage } from "./pages/app/users/index/page"

const ROOT_PATH = "/"

export const router = createBrowserRouter([
  {
    path: ROOT_PATH,
    element: <AppLayout />,
    children: [
      { path: routes.HOME, element: <HomePage /> },
      { path: routes.BEACON, element: <BeaconPage /> },
      { path: routes.SCHOOL_CALL, element: <SchoolCallPage /> },
      { path: routes.COURSE, element: <CoursePage /> },
      { path: routes.STUDENT, element: <StudentPage /> },
      { path: routes.SUBJECTS, element: <SubjectsPage /> },
      { path: routes.TEACHER, element: <TeacherPage /> },
      { path: routes.USERS, element: <UsersPage /> },
    ],
  },
  {
    path: ROOT_PATH,
    element: <AuthLayout />,
    children: [{ path: routes.SIGN_IN, element: <SignInPage /> }],
  },
])
