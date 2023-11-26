const CreateComment = () => {
  const commentNow = (e) => {
    e.preventDefault();
    console.log("comment is being added");
  };

  return (
    <div className="bg-white p-3">
      <form
        onClick={commentNow}
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
