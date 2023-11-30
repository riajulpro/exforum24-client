import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const TagsTable = ({ tags, refetch }) => {
  const deleteThePostItem = (id) => {
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
          .delete(`https://exforum24.vercel.app/tags/${id}`, {
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

  return (
    <div className="overflow-x-auto text-xs md:text-base">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Label</th>
            <th className="py-2 px-4 border-b">Value</th>
            <th className="py-2 px-4 border-b">Delete Item</th>
          </tr>
        </thead>
        <tbody>
          {tags?.map((tag) => (
            <tr key={tag._id}>
              <td className="py-2 px-4 border-b text-center">{tag.label}</td>
              <td className="py-2 px-4 border-b text-center">{tag.value}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => deleteThePostItem(tag._id)}
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

export default TagsTable;
