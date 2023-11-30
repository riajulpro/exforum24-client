import axios from "axios";
import useSingleUser from "../../hooks/data/useSingleUser";
import { useContext } from "react";
import { AuthContext } from "../../context/Authentication";
import Swal from "sweetalert2";

const CreateComment = ({ postId, refetchHandle }) => {
  const { userInfo, isLoading } = useSingleUser();

  if (isLoading) {
    return false;
  }

  const { user } = useContext(AuthContext);

  const { _id, profile_picture, email } = userInfo;

  const commentNow = (e) => {
    e.preventDefault();

    const commentText = e.target.commentText.value;

    const commentBody = {
      forPost: postId,
      user: _id,
      text: commentText,
      commenterEmail: email,
    };

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have to login first to comment",
        footer: '<Link to="/login">Login now</Link>',
      });
    } else {
      axios
        .post("https://exforum24.vercel.app/comments", commentBody, {
          withCredentials: true,
        })
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Comment successfully added",
            showConfirmButton: false,
            timer: 1500,
          });
          e.target.commentText.value = "";
          refetchHandle();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="mb-2 bg-white p-3">
      <form
        onSubmit={commentNow}
        className="flex gap-1 items-center justify-between"
      >
        <img
          src={profile_picture}
          alt=""
          className="w-6 h-6 rounded-full object-cover"
        />
        <input
          type="text"
          placeholder="enter your opinion"
          name="commentText"
          id=""
          className="border border-gray-300 py-1 px-2 w-3/4 rounded-full text-sm"
        />
        <input
          type="submit"
          value="Comment"
          className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-2 text-sm rounded-full cursor-pointer"
        />
      </form>
    </div>
  );
};

export default CreateComment;
