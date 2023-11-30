import { useState } from "react";
import Posts from "../../components/Home/Posts";
import usePosts from "../../hooks/data/usePosts";

const PostSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { posts, isLoading, refetch } = usePosts(currentPage);

  if (isLoading) {
    return "Loading...";
  }

  const pages = [...Array(posts.totalPages).keys()];

  const showPost = posts?.data || [];
  return (
    <>
      <div>
        {showPost.map((post) => (
          <Posts post={post} refetch={refetch} key={post._id} />
        ))}
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

export default PostSection;
