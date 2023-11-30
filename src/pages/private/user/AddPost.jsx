import PostForm from "../../../components/Create/PostForm";
import useSingleUser from "../../../hooks/data/useSingleUser";

const AddPost = () => {
  const { userInfo = {}, isLoading } = useSingleUser();

  const { _id: userId, isAdmin, isMember } = userInfo;

  return (
    <div className="md:h-screen mt-3 md:mt-0 flex justify-center items-center">
      <PostForm userId={userId} isAdmin={isAdmin} isMember={isMember} />
    </div>
  );
};

export default AddPost;
