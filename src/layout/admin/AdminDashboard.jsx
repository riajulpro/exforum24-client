import { NavLink, Outlet, Link, useLocation } from "react-router-dom";
import "../users/UserDashboard.css";

const UserDashboard = () => {
  const location = useLocation();

  const isActiveLink = (to) => {
    return location.pathname === to;
  };

  return (
    <div className="h-screen">
      <div className="grid grid-cols-12">
        <div className="h-screen col-span-2 bg-white shadow sticky top-0">
          <div className="p-5 border-b text-center">
            <Link to={"/"} className="hover:text-violet-400">
              <h4 className="text-2xl font-semibold">ExForum24</h4>
              <h6 className="text-xs uppercase leading-3 tracking-[0.08rem]">
                Admin Dashboard
              </h6>
            </Link>
          </div>
          <div className="nav-links flex flex-col">
            <Link
              to={"/admin-dashboard"}
              className={`${isActiveLink("/admin-dashboard") && "active"}`}
            >
              Admin Profile
            </Link>
            <NavLink to={"/admin-dashboard/manage-users"}>Manage Users</NavLink>
            <NavLink to={"/admin-dashboard/reported-comments"}>
              Reported Comments
            </NavLink>
            <NavLink to={"/admin-dashboard/make-announcement"}>
              Make Announcement
            </NavLink>
          </div>
        </div>
        <div className="col-span-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
