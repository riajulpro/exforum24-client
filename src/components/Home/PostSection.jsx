import { useState } from "react";
import Posts from "../../components/Home/Posts";
import usePosts from "../../hooks/data/usePosts";

const PostSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState("");

  const { posts, isLoading, refetch } = usePosts(currentPage, sort);

  if (isLoading) {
    return "Loading...";
  }

  const pages = [...Array(posts.totalPages).keys()];

  const showPost = posts?.data || [];

  const makeTheSort = (e) => {
    e.preventDefault();

    console.log(e.target.value);

    setSort(e.target.value);
  };

  return (
    <>
      <div className="flex justify-end">
        {/* <button
          onClick={() => setSort("popularity")}
          className="bg-action py-1 px-3 m-1 rounded hover:bg-white text-xs"
        >
          Popular Post
        </button> */}
      </div>
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
