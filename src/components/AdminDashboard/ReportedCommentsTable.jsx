import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ReportedCommentsTable = ({ reports, refetch }) => {
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
          .delete(`http://localhost:5000/posts/${id}`, {
            withCredentials: true,
          })
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
            <th className="py-2 px-4 border-b">Comments ID</th>
            <th className="py-2 px-4 border-b">Reason</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {reports?.map((report) => (
            <tr key={report._id}>
              <td className="py-2 px-4 border-b text-center">
                {report?.commenterEmail}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {report?.forComment}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {report?.reason}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button className="bg-red-500 hover:opacity-90 active:scale-95 text-white py-1 px-2 rounded">
                  Take Action
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedCommentsTable;
