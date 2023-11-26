import { createBrowserRouter } from "react-router-dom";
import Template from "../layout/main/Template";
import Home from "../pages/public/Home";
import PostDetails from "../pages/public/PostDetails";
import Edit from "../pages/private/Edit";
import Join from "../pages/public/Join";
import UserDashboard from "../layout/users/UserDashboard";
import AdminDashboard from "../layout/admin/AdminDashboard";
import AdminProfile from "../pages/private/admin/AdminProfile";
import ManageUsers from "../pages/private/admin/ManageUsers";
import ReportedComments from "../pages/private/admin/ReportedComments";
import MakeAnnouncement from "../pages/private/admin/MakeAnnouncement";
import MyProfile from "../pages/private/user/MyProfile";
import AddPost from "../pages/private/user/AddPost";
import MyPost from "../pages/private/user/MyPost";
import ErrorPage from "../layout/main/ErrorPage";
import Login from "../pages/public/Login";
import Membership from "../pages/private/Membership";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/posts/:id",
        element: <PostDetails />,
      },
      {
        path: "/edit/:id",
        element: <Edit />,
      },
      {
        path: "/membership",
        element: <Membership />,
      },
    ],
  },
  {
    path: "/user-dashboard",
    element: <UserDashboard />,
    children: [
      {
        index: true,
        element: <MyProfile />,
      },
      {
        path: "add-post",
        element: <AddPost />,
      },
      {
        path: "my-post",
        element: <MyPost />,
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
    children: [
      {
        index: true,
        element: <AdminProfile />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "reported-comments",
        element: <ReportedComments />,
      },
      {
        path: "make-announcement",
        element: <MakeAnnouncement />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/join",
    element: <Join />,
  },
]);

export default router;
