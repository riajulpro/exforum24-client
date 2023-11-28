import { useEffect, useRef, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { LuArrowBigUp, LuArrowBigDown, LuDot } from "react-icons/lu";
import { BiComment } from "react-icons/bi";
import { TfiReload } from "react-icons/tfi";
import useUsers from "../../hooks/data/useUsers";
import useComments from "../../hooks/data/useComments";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import axios from "axios";

const Posts = ({ post, refetch }) => {
  const [isMoreOptionsOpen, setMoreOptionsOpen] = useState(false);
  const moreDropdownRef = useRef(null);

  const { _id, author, title, content, tags, upVotes, downVotes, createdAt } =
    post;

  const { users = [] } = useUsers();
  const currentAuthor = users?.filter((user) => user._id === author);

  const { comments = [] } = useComments();
  const currentComment = comments.filter((comment) => comment.forPost === _id);

  const handleUpVote = () => {
    const vote = upVotes + 1;
    const voteBody = {
      upVotes: vote,
    };
    axios
      .put(`http://localhost:5000/posts/${_id}`, voteBody)
      .then(() => {
        console.log("Your vote has been added to upVotes");
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDownVote = () => {
    const vote = downVotes + 1;
    const voteBody = {
      downVotes: vote,
    };
    axios
      .put(`http://localhost:5000/posts/${_id}`, voteBody)
      .then(() => {
        console.log("Your vote has been added to downVotes");
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteThePostItem = (e, id) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:5000/posts/${id}`)
      .then((res) => {
        console.log(res);
        refetch();
      })
      .catch((err) => console.log(err));
  };

  const toggleMoreOptions = () => {
    setMoreOptionsOpen(!isMoreOptionsOpen);
  };

  const handleClickOutsideMore = (event) => {
    if (
      moreDropdownRef.current &&
      !moreDropdownRef.current.contains(event.target)
    ) {
      setMoreOptionsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideMore);

    return () => {
      document.removeEventListener("click", handleClickOutsideMore);
    };
  }, []);

  const TimeAgo = ({ date }) => {
    const formattedDate = formatDistanceToNow(parseISO(date), {
      addSuffix: true,
    });

    return <span>{formattedDate}</span>;
  };

  const handleShare = async () => {
    try {
      // Check if the share API is supported by the browser
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: content,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that do not support the share API
        console.log("Web Share API not supported.");
        // You can provide a fallback share implementation here, like opening a new window with shareable link
      }
    } catch (error) {
      console.error("Error sharing the post:", error);
    }
  };

  return (
    <div className="bg-white shadow rounded-sm p-3 mb-2 relative">
      <div className="flex items-center mb-2">
        <img
          src={currentAuthor[0]?.profile_picture} // Replace with the actual path to the user's profile picture
          alt="User Profile"
          className="w-7 h-7 rounded-full mr-2"
        />
        <div>
          <div className="flex items-center">
            <span className="text-gray-800 font-semibold text-sm">
              {currentAuthor[0]?.name}
            </span>
            <span className="text-gray-500 ml-2 text-sm">
              {<TimeAgo date={createdAt} />}
            </span>
          </div>
          <p className="text-xs text-gray-800">
            {currentAuthor[0]?.isAdmin
              ? "Admin"
              : currentAuthor[0]?.isMember
              ? "Premium Member"
              : "New User"}
          </p>
        </div>
      </div>
      <div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-gray-800 text-sm">
          {content.slice(0, 300)}{" "}
          {content.length > 300 ? (
            <Link
              to={`/posts/${_id}`}
              className="text-blue-400 hover:text-blue-500"
            >
              ...more
            </Link>
          ) : (
            ""
          )}
        </p>
        <p className="mt-1">
          {tags?.map((tag, index) => (
            <span
              className="bg-action p-1 mr-1 text-xs rounded-md text-blue-400 cursor-pointer hover:bg-gray-200"
              key={index}
            >
              #{tag}
            </span>
          ))}
        </p>
      </div>
      <div className="flex justify-between mt-2">
        {/* Upvote and Downvote */}
        <div className="flex items-center">
          <div className="rounded-full flex gap-0 border border-gray-300 text-xs mr-1">
            <button
              onClick={handleUpVote}
              className="bg-action rounded-l-full hover:bg-gray-200 flex items-center p-1 border-r border-gray-300"
            >
              <LuArrowBigUp className="w-4 h-4 text-blue-400" />
              Upvote <LuDot />{" "}
              <span className="text-gray-800 ml-1">{upVotes}</span>
            </button>
            <button
              onClick={handleDownVote}
              className="bg-action rounded-r-full hover:bg-gray-200 flex items-center p-1"
            >
              <LuArrowBigDown className="text-red-500 w-4 h-4" />
            </button>
          </div>
          <Link
            to={`/posts/${_id}`}
            className="flex items-center mr-1 hover:bg-action p-1 rounded-lg duration-150 ease-in text-xs"
          >
            <BiComment className="text-blue-500 w-4 h-4" />
            <span className="text-gray-800 ml-1">{currentComment.length}</span>
          </Link>
          <button onClick={handleShare} className="flex items-center gap-1 hover:bg-action p-1 rounded-lg duration-150 ease-in">
            <TfiReload className="text-blue-500 w-3 h-3" />
          </button>
        </div>

        {/* Comment and More Options */}
        <div className="flex items-center">
          <button
            ref={moreDropdownRef}
            onClick={toggleMoreOptions}
            className="flex items-center"
          >
            <IoIosMore className="text-gray-800 w-6 h-6 hover:bg-action aspect-square p-1 rounded-full" />
          </button>

          {/* More Options Dropdown */}
          {isMoreOptionsOpen && (
            <div className="absolute z-30 -right-5 bottom-0 mb-8 bg-white border border-gray-300 rounded p-2">
              <Link
                to={`/edit/${_id}`}
                className="cursor-pointer hover:text-blue-500"
              >
                Edit
              </Link>
              <p>
                <button
                  onClick={(e) => deleteThePostItem(e, _id)}
                  className="cursor-pointer hover:text-red-500"
                >
                  Delete
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
