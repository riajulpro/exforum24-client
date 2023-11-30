import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserTable = ({ users, refetch }) => {
  const makeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want make him admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `https://exforum24.vercel.app/users/${id}`,
            { isAdmin: true },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res);
            refetch();
          })
          .catch((err) => console.log(err));

        Swal.fire({
          title: "Update!",
          text: "User has been promoted as Admin",
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
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Membership</th>
            <th className="py-2 px-4 border-b">Make Admin</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b text-center">{user.name}</td>
              <td className="py-2 px-4 border-b text-center">{user.email}</td>
              <td className="py-2 px-4 border-b text-center">
                <p>{user.isMember ? "Premium" : "New User"}</p>
              </td>
              <td className="py-2 px-4 border-b text-center">
                {user.isAdmin ? (
                  <button className="bg-gray-200 text-slate-500 py-1 px-2 rounded cursor-not-allowed">
                    Make Admin
                  </button>
                ) : (
                  <button
                    onClick={() => makeAdmin(user._id)}
                    className="bg-red-500 hover:opacity-90 active:scale-95 text-white py-1 px-2 rounded"
                  >
                    Make Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
