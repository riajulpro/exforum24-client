import { Navigate } from "react-router-dom";
import useSingleUser from "../hooks/data/useSingleUser";

const AdminRoutes = ({ children }) => {
  const { userInfo, isLoading } = useSingleUser();

  if (isLoading) {
    return "Loading";
  }

  const { isAdmin } = userInfo;

  if (isAdmin) {
    return children;
  } else {
    return <Navigate to={"/"}></Navigate>;
  }
};

export default AdminRoutes;
