import { useState } from "react";
import UserTable from "../../../components/AdminDashboard/UserTable";
import useUsersForAdmin from "../../../hooks/data/useUsersForAdmin";

const ManageUsers = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { usersForAdmin, isLoading, refetch } = useUsersForAdmin(currentPage);

  console.log(usersForAdmin);

  if (isLoading) {
    return "Loading...";
  }

  const pages = [...Array(usersForAdmin.totalPages).keys()];

  const showUser = usersForAdmin?.data || [];

  return (
    <>
      <div className="m-2">
        <UserTable users={showUser} refetch={refetch} />
      </div>
      <div className="flex justify-center md:my-5">
        <div>
          <button
            className="bg-gray-100 p-2 border-r"
            onClick={() => {
              if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
                refetch();
              }
            }}
          >
            Prev
          </button>
          {pages.map((page) => (
            <button
              key={page}
              className={
                currentPage === page
                  ? "bg-secondary text-white p-2 border-r"
                  : "bg-gray-100 p-2 border-r"
              }
              onClick={() => {
                setCurrentPage(page);
                refetch();
              }}
            >
              {page + 1}
            </button>
          ))}
          <button
            className="bg-gray-100 p-2 border-r"
            onClick={() => {
              if (currentPage < pages.length - 1) {
                setCurrentPage(currentPage + 1);
                refetch();
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
