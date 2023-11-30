import { NavLink, Outlet, Link, useLocation } from "react-router-dom";
import "./UserDashboard.css";
import { Helmet } from "react-helmet";

const UserDashboard = () => {
  const location = useLocation();

  const isActiveLink = (to) => {
    return location.pathname === to;
  };

  return (
    <>
      <Helmet>
        <title>User Dashboard</title>
      </Helmet>
      <div className="h-screen">
        <div className="grid grid-cols-12">
          <div className="md:h-screen col-span-12 md:col-span-2 bg-white shadow sticky top-0">
            <div className="p-3 border-b pb-5">
              <Link to={"/"} className="hover:text-violet-400">
                <h4 className="text-2xl font-semibold">ExForum24</h4>
                <h6 className="text-xs uppercase leading-3 tracking-[0.13rem]">
                  User Dashboard
                </h6>
              </Link>
            </div>
            <div className="nav-links flex flex-row justify-center text-xs md:flex-col md:justify-start md:text-base">
              <Link
                to={"/user-dashboard"}
                className={`${isActiveLink("/user-dashboard") && "active"}`}
              >
                My Profile
              </Link>
              <NavLink to={"/user-dashboard/add-post"}>Add Post</NavLink>
              <NavLink to={"/user-dashboard/my-post"}>My Post</NavLink>
            </div>
          </div>
          <div className="col-span-12 md:col-span-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
