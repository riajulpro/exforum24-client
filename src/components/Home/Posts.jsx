// eslint-disable-next-line react/prop-types

import { useEffect, useRef, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { LuArrowBigUp, LuArrowBigDown, LuDot } from "react-icons/lu";
import { BiComment } from "react-icons/bi";
import { TfiReload } from "react-icons/tfi";

const Posts = ({ username, timestamp }) => {
  const [upVotes, setUpVotes] = useState(100000);
  const [downVotes, setDownVotes] = useState(0);
  const [comments, setComments] = useState([]);
  const [isMoreOptionsOpen, setMoreOptionsOpen] = useState(false);
  const moreDropdownRef = useRef(null);

  const handleUpVote = () => {
    setUpVotes(upVotes + 1);
  };

  const handleDownVote = () => {
    setDownVotes(downVotes + 1);
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
              {username}
            </span>
            <span className="text-gray-500 ml-2 text-sm">{timestamp}</span>
          </div>
          <p className="text-xs text-gray-800">Admin</p>
        </div>
      </div>
      <div>
        <p className="font-semibold text-sm">Title will be here</p>
        <p className="text-gray-800 text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
          inventore dolore eligendi, quo doloribus voluptates deserunt dolores
          dicta dolorum architecto qui consequatur saepe. Quaerat culpa
          doloremque asperiores vel tempora voluptas veniam minus quae nihil
          earum repudiandae ex error, repellendus est officiis labore itaque
          temporibus voluptatum aspernatur explicabo. Libero, impedit
          voluptatibus.
        </p>
      </div>
      <div className="flex justify-between mt-2">
        {/* Upvote and Downvote */}
        <div className="flex items-center">
          <div className="bg-action rounded-full flex gap-0 border border-gray-300 text-sm mr-1">
            <button
              onClick={handleUpVote}
              className="flex items-center p-1 border-r border-gray-300"
            >
              <LuArrowBigUp className="w-5 h-5 text-blue-400" />
              Upvote <LuDot />{" "}
              <span className="text-gray-800 ml-1">
                {(upVotes / 1000).toFixed(1)}K
              </span>
            </button>
            <button onClick={handleDownVote} className="flex items-center p-1">
              <LuArrowBigDown className="text-red-500 w-5 h-5" />
            </button>
          </div>
          <button className="flex items-center mr-1 hover:bg-action p-1 rounded-lg duration-150 ease-in">
            <BiComment className="text-blue-500 w-5 h-5" />
            <span className="text-gray-800 ml-1">{comments.length}</span>
          </button>
          <button className="flex items-center gap-1 hover:bg-action p-1 rounded-lg duration-150 ease-in">
            <TfiReload className="text-blue-500 w-4 h-4" /> <span>0</span>
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
              <p className="cursor-pointer hover:text-blue-500">Edit Post</p>
              <p className="cursor-pointer hover:text-red-500">Delete Post</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
