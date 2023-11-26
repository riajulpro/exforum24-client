import axios from "axios";

const CreateComment = ({ postId, refetchHandle }) => {
  console.log(postId);

  const commentNow = (e) => {
    e.preventDefault();

    const commentText = e.target.commentText.value;

    const commentBody = {
      forPost: postId,
      user: "65616b5fe439c3ed317aac78",
      text: commentText,
    };

    console.log(commentBody);

    axios
      .post("http://localhost:5000/comments", commentBody)
      .then((response) => {
        console.log(response);
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
          src="https://th.bing.com/th/id/OIP.2r5wqEPi_CvcNGmUprinPwHaIB?rs=1&pid=ImgDetMain"
          alt=""
          className="w-6 h-6 rounded-full object-cover"
        />
        <input
          type="text"
          placeholder="enter your opinion"
          name="commentText"
          id=""
          className="border border-gray-300 py-1 px-2 w-3/4 rounded-full"
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
