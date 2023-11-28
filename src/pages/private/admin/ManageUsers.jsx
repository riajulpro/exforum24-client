import useUsers from "../../../hooks/data/useUsers";

const ManageUsers = () => {
  const { isLoading, users } = useUsers();

  console.log(users);

  return <div></div>;
};

export default ManageUsers;
