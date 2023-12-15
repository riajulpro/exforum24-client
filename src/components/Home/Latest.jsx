import { Link } from "react-router-dom";
import usePosts from "../../hooks/data/usePosts";

const Latest = () => {
  const sort = "popularity";
  const currentPage = 0;

  const { posts, isLoading, refetch } = usePosts(currentPage, sort);
  const showPost = posts?.data || [];

  return (
    <div className="">
      <h4 className="font-semibold text-sm bg-white p-2 rounded-r-full">
        Popular Posts:
      </h4>
      {showPost.map((post) => (
        <Link key={post._id} to={`/posts/${post._id}`} className="group">
          <div className="bg-white rounded-md m-1 shadow-md group-hover:shadow-xl my-3">
            {post.thumbnail && (
              <img
                src={post.thumbnail}
                alt={post.title}
                className="h-24 object-cover w-full rounded-t-md"
              />
            )}
            <p className="p-2 group-hover:text-blue-600">{post.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Latest;
