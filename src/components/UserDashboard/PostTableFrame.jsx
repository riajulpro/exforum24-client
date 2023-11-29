import axios from "axios";
import { useEffect, useState } from "react";
import PostTable from "./PostTable";
import { useQuery } from "@tanstack/react-query";

const PostTableFrame = ({ userId }) => {
  console.log("userId is", userId);

  const { data: myPosts, refetch } = useQuery({
    queryKey: ["myOwnPostsToShowSecond", userId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/posts/mine/${userId}`);
      return res.data.data;
    },
  });

  console.log("all my posts", myPosts);

  return (
    <div>
      <PostTable posts={myPosts} refetch={refetch} />
    </div>
  );
};

export default PostTableFrame;
