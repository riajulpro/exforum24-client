import axios from "axios";
import { useEffect, useState } from "react";
import PostTable from "./PostTable";
import { useQuery } from "@tanstack/react-query";

const PostTableFrame = ({ userId }) => {
  const { data: myPosts, refetch } = useQuery({
    queryKey: ["myOwnPostsToShowSecond", userId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/posts/mine/${userId}`);
      return res.data.data;
    },
  });

  return (
    <div>
      <PostTable posts={myPosts} refetch={refetch} />
    </div>
  );
};

export default PostTableFrame;
