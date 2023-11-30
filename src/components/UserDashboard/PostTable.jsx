import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const PostTable = ({ posts, refetch }) => {
  const deleteThePostItem = (e, id) => {
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
          .delete(`http://localhost:5000/posts/${id}`)
          .then((res) => {
            console.log(res);
            refetch();
          })
          .catch((err) => console.log(err));

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="overflow-x-auto text-xs md:text-base">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Post Title</th>
            <th className="py-2 px-4 border-b">Number of Votes</th>
            <th className="py-2 px-4 border-b">Comment Button</th>
            <th className="py-2 px-4 border-b">Delete Button</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post) => (
            <tr key={post._id}>
              <td className="py-2 px-4 border-b text-center">{post.title}</td>
              <td className="py-2 px-4 border-b text-center">{post.upVotes}</td>
              <td className="py-2 px-4 border-b text-center">
                <Link
                  to={`/user-dashboard/show-comments/${post._id}`}
                  className="bg-blue-500 hover:opacity-90 active:scale-95 text-white py-1 px-2 rounded"
                >
                  Comment
                </Link>
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={(e) => deleteThePostItem(e, post._id)}
                  className="bg-red-500 hover:opacity-90 active:scale-95 text-white py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
