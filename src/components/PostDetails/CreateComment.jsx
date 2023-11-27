import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/Authentication";
import useSingleUser from "../../hooks/data/useSingleUser";

const CreateComment = ({ postId, refetchHandle }) => {
  // -------------------------------------------------------------
  const { user } = useContext(AuthContext);

  let userEmail = "";

  if (user) {
    let userEmail = user.email;
  }

  const { currentUser = [], isLoading } = useSingleUser(userEmail);

  if (isLoading) {
    return "Loading...";
  }

  const { _id } = currentUser[0];

  // -------------------------------------------------------------

  const commentNow = (e) => {
    e.preventDefault();

    const commentText = e.target.commentText.value;

    const commentBody = {
      forPost: postId,
      user: _id,
      text: commentText,
    };

    axios
      .post("http://localhost:5000/comments", commentBody)
      .then((response) => {
        e.target.commentText.value = "";
        refetchHandle();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mb-2 bg-white p-3">
      <form
        onSubmit={commentNow}
        className="flex gap-1 items-center justify-between"
      >
        <img
          src={user?.photoURL}
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
