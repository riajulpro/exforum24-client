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
import AnnouncementDetails from "../pages/public/AnnouncementDetails";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import Payment from "../pages/private/user/Payment/Payment";
import CommentsTableFrame from "../components/UserDashboard/CommentsTableFrame";

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
        loader: ({ params }) =>
          fetch(`http://localhost:5000/posts/${params.id}`),
      },
      {
        path: "/membership",
        element: (
          <UserRoutes>
            <Membership />
          </UserRoutes>
        ),
      },
      {
        path: "/announcement-details/:id",
        element: <AnnouncementDetails />,
      },
    ],
  },
  {
    path: "/user-dashboard",
    element: (
      <UserRoutes>
        <UserDashboard />
      </UserRoutes>
    ),
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
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "show-comments/:id",
        element: <CommentsTableFrame />,
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: (
      <AdminRoutes>
        <AdminDashboard />
      </AdminRoutes>
    ),
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
