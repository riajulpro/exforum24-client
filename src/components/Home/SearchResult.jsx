const SearchResult = ({ refresh }) => {
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
    </div>
  );
};

export default SearchResult;
