import axios from "axios";
import { useState } from "react";
import PostTable from "./PostTable";
import { useQuery } from "@tanstack/react-query";

const PostTableFrame = ({ userId }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: myPosts,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myPostPageByPage", userId, currentPage],
    queryFn: async () => {
      const res = await axios.get(
        `https://exforum24.vercel.app/posts/mine/${userId}?page=${
          currentPage + 1
        }`,
        { withCredentials: true }
      );
      return res.data;
    },
  });

  if (isLoading) {
    return "Loading...";
  }

  const pages = [...Array(myPosts.totalPages).keys()];

  const showPosts = myPosts?.data || [];

  return (
    <>
      <div>
        <PostTable posts={showPosts} refetch={refetch} />
      </div>
      <div className="flex justify-center md:my-5">
        <div>
          <button
            className="bg-gray-100 p-2 border-r"
            onClick={() => {
              if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
                refetch();
              }
            }}
          >
            Prev
          </button>
          {pages.map((page) => (
            <button
              key={page}
              className={
                currentPage === page
                  ? "bg-secondary text-white p-2 border-r"
                  : "bg-gray-100 p-2 border-r"
              }
              onClick={() => {
                setCurrentPage(page);
                refetch();
              }}
            >
              {page + 1}
            </button>
          ))}
          <button
            className="bg-gray-100 p-2 border-r"
            onClick={() => {
              if (currentPage < pages.length - 1) {
                setCurrentPage(currentPage + 1);
                refetch();
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default PostTableFrame;
