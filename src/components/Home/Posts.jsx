// eslint-disable-next-line react/prop-types

import { useEffect, useRef, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { LuArrowBigUp, LuArrowBigDown, LuDot } from "react-icons/lu";
import { BiComment } from "react-icons/bi";
import { TfiReload } from "react-icons/tfi";
import useUsers from "../../hooks/data/useUsers";
import useComments from "../../hooks/data/useComments";
import { formatDistanceToNow, parseISO } from "date-fns";

// eslint-disable-next-line react/prop-types
const Posts = ({ post }) => {
  const [isMoreOptionsOpen, setMoreOptionsOpen] = useState(false);
  const moreDropdownRef = useRef(null);

  const { users = [] } = useUsers();
  const currentAuthor = users?.filter((user) => user._id === post.author);

  const { comments = [] } = useComments();
  const currentComment = comments.filter(
    (comment) => comment.forPost === post._id
  );

  const handleUpVote = () => {
    // setUpVotes(upVotes + 1);
  };

  const handleDownVote = () => {
    // setDownVotes(downVotes + 1);
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

  return (
    <div className="bg-white shadow rounded-sm p-3 mb-2 relative">
      <div className="flex items-center mb-2">
        <img
          src="https://th.bing.com/th/id/OIP.2r5wqEPi_CvcNGmUprinPwHaIB?rs=1&pid=ImgDetMain" // Replace with the actual path to the user's profile picture
          alt="User Profile"
          className="w-7 h-7 rounded-full mr-2"
        />
        <div>
          <div className="flex items-center">
            <span className="text-gray-800 font-semibold text-sm">
              {currentAuthor[0]?.name}
            </span>
            <span className="text-gray-500 ml-2 text-sm">
              {<TimeAgo date={post?.createdAt} />}
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
        <p className="font-semibold text-sm">{post?.title}</p>
        <p className="text-gray-800 text-sm">{post?.content}</p>
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
              <span className="text-gray-800 ml-1">{post.upVotes}</span>
            </button>
            <button
              onClick={handleDownVote}
              className="bg-action rounded-r-full hover:bg-gray-200 flex items-center p-1"
            >
              <LuArrowBigDown className="text-red-500 w-4 h-4" />
            </button>
          </div>
          <button className="flex items-center mr-1 hover:bg-action p-1 rounded-lg duration-150 ease-in text-xs">
            <BiComment className="text-blue-500 w-4 h-4" />
            <span className="text-gray-800 ml-1">{currentComment.length}</span>
          </button>
          <button className="flex items-center gap-1 hover:bg-action p-1 rounded-lg duration-150 ease-in">
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
            <IoIosMore className="text-gray-800 w-6 h-6" />
          </button>

          {/* More Options Dropdown */}
          {isMoreOptionsOpen && (
            <div className="absolute -right-5 bottom-0 mb-8 bg-white border border-gray-300 rounded p-2">
              <p className="cursor-pointer hover:text-blue-500">Edit</p>
              <p className="cursor-pointer hover:text-red-500">Delete</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
