import React, { useEffect, useRef, useState } from "react";
import useUsers from "../../hooks/data/useUsers";
import { LuArrowBigUp, LuArrowBigDown, LuDot } from "react-icons/lu";
import { IoIosMore } from "react-icons/io";
import axios from "axios";

const Comments = ({ comment, refetch }) => {
  const [isMoreOptionsOpen, setMoreOptionsOpen] = useState(false);

  const { users = [] } = useUsers();
  const currentAuthor = users?.filter((user) => user._id === comment.user);
  const moreDropdownRef = useRef(null);

  const handleUpVote = () => {
    // setUpVotes(upVotes + 1);
  };

  const handleDownVote = () => {
    // setDownVotes(downVotes + 1);
  };

  const deleteTheCommentItem = (e, id) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:5000/comments/${id}`)
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

  console.log(currentAuthor);

  return (
    <>
      <div className="border-b border-gray-200 bg-white p-2">
        <div className="flex gap-1 items-start">
          <img
            src={currentAuthor[0]?.profile_picture}
            className="w-5 h-5 rounded-full aspect-square object-cover"
          />
          <div className="w-full">
            <p className="text-sm font-medium">{currentAuthor[0]?.name}</p>
            <p className="text-sm py-1 text-gray-800">{comment.text}</p>
            <div className="relative flex justify-between">
              {/* Upvote and Downvote */}
              <div className="flex items-center">
                <div className="rounded-full flex gap-0 border border-gray-300 text-xs mr-1">
                  <button
                    onClick={handleUpVote}
                    className="bg-action rounded-l-full hover:bg-gray-200 flex items-center p-1 border-r border-gray-300"
                  >
                    <LuArrowBigUp className="w-4 h-4 text-blue-400" />
                  </button>
                  <button
                    onClick={handleDownVote}
                    className="bg-action rounded-r-full hover:bg-gray-200 flex items-center p-1"
                  >
                    <LuArrowBigDown className="text-red-500 w-4 h-4" />
                  </button>
                </div>
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
                  <div className="absolute -right-5 bottom-0 mb-8 bg-white border border-gray-300 rounded p-2">
                    <p>
                      <button className="cursor-pointer hover:text-blue-500">Edit</button>
                    </p>
                    <p>
                      <button className="cursor-pointer hover:text-red-500"
                        onClick={(e) => deleteTheCommentItem(e, comment._id)}
                      >
                        Delete
                      </button>
                    </p>
                    <p className="cursor-pointer hover:text-red-500">Report</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
