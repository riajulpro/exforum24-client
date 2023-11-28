import useSingleUser from "../../../hooks/data/useSingleUser";

const MyPost = () => {
  const { currentUser, isLoading } = useSingleUser();

  const { _id } = currentUser;

  return <div></div>;
};

export default MyPost;
