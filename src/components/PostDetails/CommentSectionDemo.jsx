import React from "react";

const CommentSectionDemo = () => {
  return (
    <div className="mb-2 bg-white p-3">
      <form className="flex gap-1 items-center justify-between">
        <img
          src="https://th.bing.com/th/id/R.a6e328f484dfaee5cff22431f5c61cab?rik=QtxCe0VZ6bQvjQ&pid=ImgRaw&r=0"
          alt=""
          className="w-6 h-6 rounded-full object-cover"
        />
        <input
          type="text"
          placeholder="enter your opinion"
          name="commentText"
          className="border border-gray-300 py-1 px-2 w-3/4 rounded-full text-sm"
          disabled
        />
        <input
          type="submit"
          value="Comment"
          disabled
          className="bg-blue-100 text-white py-1 px-2 text-sm rounded-full cursor-not-allowed"
        />
      </form>
    </div>
  );
};

export default CommentSectionDemo;
