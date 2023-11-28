import { Navigate } from "react-router-dom";
import useSingleUser from "../hooks/data/useSingleUser";

const AdminRoutes = ({ children }) => {
  const { userInfo, isLoading } = useSingleUser();

  if (isLoading) {
    return "Loading";
  }

  const { isAdmin } = userInfo[0];

  console.log(isAdmin);

  if (isAdmin) {
    return children;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
};

export default AdminRoutes;
