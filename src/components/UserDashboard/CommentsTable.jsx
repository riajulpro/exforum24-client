import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CommentsTable = ({ comments, refetch }) => {
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
          .delete(`https://exforum24.vercel.app/posts/${id}`)
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

  const handleReportReason = (e) => {
    const reason = e.target.value;

    console.log(reason);
  };

  return (
    <div className="overflow-x-auto text-xs md:text-base">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Commenter</th>
            <th className="py-2 px-4 border-b">Comment Text</th>
            <th className="py-2 px-4 border-b">Feedback</th>
            <th className="py-2 px-4 border-b">Report Button</th>
          </tr>
        </thead>
        <tbody>
          {comments?.map((comment) => (
            <tr key={comment._id}>
              <td className="py-2 px-4 border-b text-center">
                {comment.commenterEmail}
              </td>
              <td className="py-2 px-4 border-b text-center">{comment.text}</td>
              <td className="py-2 px-4 border-b text-center">
                <form>
                  <select name="reason" onChange={handleReportReason}>
                    <option value="">--select--</option>
                    <option value="verbal-abuse">Verbal Abuse</option>
                    <option value="adult">Adult</option>
                    <option value="irrelevant">Irrelevant</option>
                  </select>
                </form>
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => reportNow(comment._id)}
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

export default CommentsTable;
