import UserTable from "../../../components/AdminDashboard/UserTable";
import useUsers from "../../../hooks/data/useUsers";

const ManageUsers = () => {
  const { isLoading, users, refetch } = useUsers();

  console.log(users);

  return (
    <div className="m-2">
      <UserTable users={users} refetch={refetch} />
    </div>
  );
};

export default ManageUsers;
