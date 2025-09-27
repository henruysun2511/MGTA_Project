import { createBrowserRouter } from "react-router-dom";
import ProtectedAdminRoute from "../components/ProtectedAdminRoute";
import ProtectedClientRoute from "../components/ProtectedClientRoute";
import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";
import UserLayout from "../layouts/UserLayout";
import AccountMana from "../pages/admin/AccountMana";
import BlogMana from "../pages/admin/BlogMana";
import ClassMana from "../pages/admin/ClassMana";
import ClassScheduleMana from "../pages/admin/ClassScheduleMana";
import ExerciseMana from "../pages/admin/ExerciseMana";
import ExerciseDetailMana from "../pages/admin/ExerciseMana/ExerciseDetailMana";
import SkillMana from "../pages/admin/ExerciseMana/SkillMana";
import Overview from "../pages/admin/Overview";
import PermissionRoleMana from "../pages/admin/PermissionRoleMana";
import RecycleBin from "../pages/admin/RecycleBin";
import ScoreMana from "../pages/admin/ScoreMana";
import Login from "../pages/auth/Login";
import Logout from "../pages/auth/Logout";
import Register from "../pages/auth/Register";
import AboutUs from "../pages/client/AboutUs";
import Blog from "../pages/client/Blog";
import BlogDetail from "../pages/client/Blog/BlogDetail";
import Curriculum from "../pages/client/Curriculum";
import ExerciseDetail from "../pages/client/ExerciseDetail";
import Feedback from "../pages/client/Feedback";
import Home from "../pages/client/Home";
import Practice from "../pages/client/Practice";
import Profile from "../pages/client/Profile";
import Score from "../pages/client/Score";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      { path: "register", element: <Register /> }
    ],
  },
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "curriculum", element: <Curriculum /> },
      { path: "blog", element: <Blog /> },
      { path: "blogDetail/:id", element: <BlogDetail />},
      { path: "feedback", element: <Feedback /> },
      { path: "aboutUs", element: <AboutUs /> },
      {
        element: <ProtectedClientRoute />, 
        children: [
          { path: "exerciseDetail/:id", element: <ExerciseDetail /> },
          { path: "practice/:id", element: <Practice /> },
          { path: "score/:id", element: <Score /> },
          { path: "profile", element: <Profile /> },
        ]
      }
    ],
  },
  {
    path: "/admin",
    element: <ProtectedAdminRoute roles={["68ada708a19888b3462e7a6f"]} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "overview", element: <Overview /> },
          { path: "accountMana", element: <AccountMana /> },
          { path: "exerciseMana", element: <ExerciseMana /> },
          { path: "exerciseDetailMana/:id", element: <ExerciseDetailMana /> },
          { path: "blogMana", element: <BlogMana /> },
          { path: "classScheduleMana", element: <ClassScheduleMana /> },
          { path: "classMana", element: <ClassMana /> },
          { path: "scoreMana", element: <ScoreMana /> },
          { path: "recycleBin", element: <RecycleBin /> },
          { path: "permissionMana", element: <PermissionRoleMana /> },
          { path: "skillMana", element: <SkillMana /> },
        ],
      },
    ]
  }
]
);

export default router;
