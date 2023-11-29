import { useEffect, useState } from "react";
import useSingleUser from "../../../hooks/data/useSingleUser";
import axios from "axios";
import Posts from "../../../components/Home/Posts";
import PostTable from "../../../components/UserDashboard/PostTable";
import PostTableFrame from "../../../components/UserDashboard/PostTableFrame";

const MyPost = () => {
  const { userInfo = {} } = useSingleUser();

  const { _id, name, email, badges, isAdmin, isMember, profile_picture } =
    userInfo;

  return (
    <div className="m-2">
      <PostTableFrame userId={_id} />
    </div>
  );
};

export default MyPost;
