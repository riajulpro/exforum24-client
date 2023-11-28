import { Link } from "react-router-dom";

const SearchResult = ({ refresh, result }) => {
  return (
    <div className="my-2">
      <p className="flex justify-between">
        <span>Your search results:</span>
        <span>
          <button
            onClick={() => refresh([])}
            className="text-blue-400 hover:text-blue-500"
          >
            Back to home
          </button>
        </span>
      </p>
      <p>
        {result.map((res) => (
          <Link to={`/posts/${res._id}`} key={res._id}>
            <div className="bg-white mt-2 p-3 hover:text-blue-400 cursor-pointer">
              <h3 className="text-sm font-semibold">{res.title}</h3>
              <p className="text-xs">{res.content.slice(0, 150)}...</p>
            </div>
          </Link>
        ))}
      </p>
    </div>
  );
};

export default SearchResult;
