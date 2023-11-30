import axios from "axios";
import Announcement from "../../components/Home/Announcement";
import PostSection from "../../components/Home/PostSection";
import { useContext, useState } from "react";
import useTags from "../../hooks/data/useTags";
import SearchResult from "../../components/Home/SearchResult";
import { AuthContext } from "../../context/Authentication";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Home = () => {
  const [searchResult, setSearchResult] = useState([]);

  const { user } = useContext(AuthContext);

  const searchNow = (e) => {
    e.preventDefault();

    const searchItem = e.target.searchItem.value;

    axios
      .get(`https://exforum24.vercel.app/posts/search?q=${searchItem}`)
      .then(function (response) {
        setSearchResult(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const searchByTags = (tag) => {
    axios
      .get(`https://exforum24.vercel.app/posts/search?q=${tag}`)
      .then(function (response) {
        setSearchResult(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const { tags = [] } = useTags();

  return (
    <>
      <Helmet>
        <title>ExForum24 | An Ocean of Knowledge</title>
      </Helmet>
      <div className="grid grid-cols-12 gap-1 w-11/12 md:w-9/12 mx-auto md:gap-3 my-5">
        <div className="col-span-12 md:col-span-2 md:mb-4">
          {user && (
            <Link
              to={"/user-dashboard/add-post"}
              className="py-1 px-3 border bg-action border-gray-200 rounded cursor-pointer hover:bg-white text-sm text-center block md:inline-block"
            >
              +Create Post
            </Link>
          )}
        </div>
        <div className="col-span-12 md:col-span-7 md:mb-4">
          <div className="mb-2 bg-white p-3 rounded-sm shadow">
            <form
              onSubmit={searchNow}
              className="flex justify-center items-center"
            >
              <input
                type="text"
                name="searchItem"
                placeholder="Enter any tags to find"
                className="text-sm w-1/2 md:w-9/12 py-1 px-2 rounded-l-full border-gray-200 border"
              />
              <input
                type="submit"
                value="Find"
                className="bg-blue-400 border border-blue-gray-400 text-white hover:bg-blue-500 py-1 px-2 rounded-r-full text-sm cursor-pointer"
              />
            </form>
            <div className="mt-2 text-xs">
              <p className="text-center my-2">Search with these:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {tags.map((tag, idx) => (
                  <button
                    key={idx}
                    className="text-blue-400 hover:text-blue-500 bg-action p-1 rounded"
                    onClick={() => searchByTags(tag)}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {searchResult.length > 0 ? (
            <SearchResult refresh={setSearchResult} result={searchResult} />
          ) : (
            <PostSection />
          )}
        </div>
        <div className="col-span-12 md:col-span-3">
          <Announcement />
        </div>
      </div>
    </>
  );
};

export default Home;
