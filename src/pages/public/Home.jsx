import axios from "axios";
import Announcement from "../../components/Home/Announcement";
import PostSection from "../../components/Home/PostSection";
import { useContext, useState } from "react";
import useTags from "../../hooks/data/useTags";
import SearchResult from "../../components/Home/SearchResult";
import { AuthContext } from "../../context/Authentication";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Latest from "../../components/Home/Latest";

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
          <div>
            <form
              onSubmit={searchNow}
              className="flex justify-center items-center"
            >
              <input
                type="text"
                name="searchItem"
                placeholder="Enter any tags to find"
                className="text-sm w-2/3 md:w-9/12 py-1 px-2 rounded-l-full border-gray-200 border"
              />
              <input
                type="submit"
                value="Find"
                className="bg-blue-400 border border-blue-gray-400 text-white hover:bg-blue-500 py-1 px-2 rounded-r-full text-sm cursor-pointer"
              />
            </form>
          </div>
          <div className="mt-2 text-xs">
            <p className="text-center my-2">Search by tags:</p>
            <div className="flex justify-center flex-row md:flex-col flex-wrap md:flex-nowrap gap-1">
              {tags.map((tag, idx) => (
                <button
                  key={idx}
                  className="inline-block md:block text-blue-400 hover:text-blue-500 bg-white p-1 rounded"
                  onClick={() => searchByTags(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-7 md:mb-4">
          <Link to="/user-dashboard/add-post">
            <div className="bg-white mb-2 rounded-sm cursor-pointer">
              <div className="flex gap-1 items-center p-3">
                <img
                  src={user?.photoURL}
                  alt=""
                  className="w-7 h-7 rounded-full"
                />
                <span className="w-full rounded-full bg-action p-1 text-sm text-gray-600">
                  Share your thoughts...
                </span>
              </div>
              <div className="flex justify-center items-center text-sm">
                <div className="flex-1 w-full text-center border-r border-t hover:text-blue-600">
                  Posts
                </div>
                <div className="flex-1 w-full text-center border-r border-t hover:text-blue-600">
                  Add Photos
                </div>
                <div className="flex-1 w-full text-center border-t hover:text-blue-600">
                  Feelings
                </div>
              </div>
            </div>
          </Link>
          {searchResult.length > 0 ? (
            <SearchResult refresh={setSearchResult} result={searchResult} />
          ) : (
            <PostSection />
          )}
        </div>
        <div className="col-span-12 md:col-span-3">
          <Latest />
        </div>
      </div>
    </>
  );
};

export default Home;
