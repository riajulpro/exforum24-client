import { createBrowserRouter } from "react-router-dom";
import Template from "../layout/main/Template";
import Home from "../pages/public/Home";
import PostDetails from "../pages/public/PostDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/posts/:id",
        element: <PostDetails />,
      },
    ],
  },
]);

export default router;
