import React, { useContext, useEffect, useRef, useState } from "react";
import useUsers from "../../hooks/data/useUsers";
import { LuArrowBigUp, LuArrowBigDown, LuDot } from "react-icons/lu";
import { IoIosMore } from "react-icons/io";
import axios from "axios";
import { AuthContext } from "../../context/Authentication";
import Swal from "sweetalert2";

const Comments = ({ comment, refetch }) => {
  const [isMoreOptionsOpen, setMoreOptionsOpen] = useState(false);

  const { users = [] } = useUsers();

  const { user } = useContext(AuthContext);

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

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://exforum24.vercel.app/comments/${id}`, {
            withCredentials: true,
          })
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your comment has been deleted.",
              icon: "success",
            });
            refetch();
          })
          .catch((err) => console.log(err));
      }
    });
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

  const [activateModal, setActivateModal] = useState(false);

  const [itemSelected, setItemSelected] = useState(false);

  function onChangeData(e) {
    setItemSelected(e.target.value !== "");
  }

  const handleReport = (e, commentId, commenterEmail) => {
    e.preventDefault();

    const reason = e.target.reason.value;

    const reportData = {
      forComment: commentId,
      reason: reason,
      commenterEmail,
    };

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have to login to report!",
        footer: '<Link to="/login">Login now to report</Link>',
      });
    } else {
      axios
        .post("https://exforum24.vercel.app/reports", reportData, {
          withCredentials: true,
        })
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You have successfully reported!",
            showConfirmButton: false,
            timer: 1500,
          });
          setActivateModal(false);
        })
        .catch((err) => console.log(err));
    }
  };

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
                      <button className="cursor-pointer hover:text-blue-500">
                        Edit
                      </button>
                    </p>
                    <p>
                      <button
                        className="cursor-pointer hover:text-red-500"
                        onClick={(e) => deleteTheCommentItem(e, comment._id)}
                      >
                        Delete
                      </button>
                    </p>
                    <button
                      onClick={() => setActivateModal(true)}
                      className="cursor-pointer hover:text-red-500"
                    >
                      Report
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {activateModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60">
          <div className="fixed bg-white w-2/3 md:w-1/2 h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-md">
            <button
              className="absolute top-1 right-2"
              onClick={() => setActivateModal(false)}
            >
              close
            </button>
            <h1 className="mb-2">Select the reason of reporting:</h1>
            <div className="relative">
              <form
                onSubmit={(e) =>
                  handleReport(e, comment._id, comment.commenterEmail)
                }
              >
                <div className="relative">
                  <select
                    onChange={onChangeData}
                    className="border p-1 w-1/2"
                    name="reason"
                  >
                    <option value="">--select--</option>
                    <option value="verbal-abuse">Verbal Abuse</option>
                    <option value="adult">Adult</option>
                    <option value="irrelevant">Irrelevant</option>
                  </select>
                  <input
                    type="submit"
                    value="Report"
                    className={`cursor-pointer ${
                      itemSelected
                        ? "bg-violet-600 hover:bg-violet-400 border-violet-600"
                        : "bg-gray-200 border-gray-200"
                    } text-white p-1 border`}
                    disabled={!itemSelected}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
