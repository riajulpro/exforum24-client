import axios from "axios";
import { useEffect, useState } from "react";
import Posts from "../Home/Posts";
import { useQuery } from "@tanstack/react-query";

const RecentPosts = ({ userId }) => {
  const { data: myPosts, refetch } = useQuery({
    queryKey: ["myOwnPostsToShow", userId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/posts/mine/${userId}`);
      return res.data.data;
    },
  });

  return (
    <div>
      {myPosts?.slice(0, 3)?.map((post) => (
        <Posts key={post._id} post={post} refetch={refetch} />
      ))}
    </div>
  );
};

export default RecentPosts;
