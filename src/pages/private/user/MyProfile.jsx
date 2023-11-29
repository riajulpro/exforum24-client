import { useEffect, useState } from "react";
import useSingleUser from "../../../hooks/data/useSingleUser";
import RecentPosts from "../../../components/UserDashboard/RecentPosts";
import { Navigate } from "react-router-dom";

const MyProfile = () => {
  // ------------------------------------------------------------
  const { userInfo = {} } = useSingleUser();

  const { _id, name, email, badges, isAdmin, isMember, profile_picture } =
    userInfo;

  if (isAdmin) {
    return <Navigate to={"/admin-dashboard"}></Navigate>;
  }

  return (
    <div>
      <div className="text-center p-3 bg-white m-2 rounded shadow-md">
        <div className="flex justify-center">
          <img
            src={profile_picture}
            alt=""
            className="w-20 h-20 rounded-full border-2 border-violet-500"
          />
        </div>
        <h3 className="text-3xl font-semibold">{name}</h3>
        <p className="text-slate-500">{email}</p>
        <div>
          {badges?.map((badge, idx) => (
            <p key={idx}>{badge}</p>
          ))}
        </div>
        <p>{isAdmin ? "Admin" : isMember ? "Premium Member" : "New User"}</p>
      </div>
      <div className="p-3 bg-white m-2 rounded shadow-md">
        <h5 className="text-xl mb-2">My recent posts: </h5>
        <div>
          <RecentPosts userId={_id} />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
