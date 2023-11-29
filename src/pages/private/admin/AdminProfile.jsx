import useComments from "../../../hooks/data/useComments";
import useSingleUser from "../../../hooks/data/useSingleUser";
import useTotalPosts from "../../../hooks/data/useTotalPosts";
import useUsers from "../../../hooks/data/useUsers";

const AdminProfile = () => {
  const { userInfo = {}, isLoading } = useSingleUser();

  const { totalPosts } = useTotalPosts();
  const { comments = [] } = useComments();
  const { users = [] } = useUsers();

  if (isLoading) {
    return "Loading...";
  }

  const { name, email, isAdmin, isMember, badges, profile_picture } = userInfo;

  return (
    <div>
      <div className="text-center p-3 bg-white m-2 rounded shadow-md">
        <div className="flex justify-center">
          <img
            src={profile_picture}
            alt=""
            className="w-20 h-20 rounded-full border-2 border-violet-500"
          />
        </div>
        <h3 className="text-3xl font-semibold">{name}</h3>
        <p className="text-slate-500">{email}</p>
        <p>
          {badges.map((badge, idx) => (
            <p key={idx}>{badge}</p>
          ))}
        </p>
        <p>{isAdmin ? "Admin" : isMember ? "Premium Member" : "New User"}</p>
      </div>
      <div className="p-3 bg-white m-2 rounded shadow-md">
        <div className="flex justify-center gap-10 items-center">
          <div className="text-center">
            <h5 className="text-xl text-slate-500 font-semibold">
              Total Posts
            </h5>
            <p className="text-slate-400 text-3xl font-extrabold">
              {totalPosts}
            </p>
          </div>
          <div className="text-center">
            <h5 className="text-xl text-slate-500 font-semibold">
              Total Comments
            </h5>
            <p className="text-slate-400 text-3xl font-extrabold">
              {comments?.length}
            </p>
          </div>
          <div className="text-center">
            <h5 className="text-xl text-slate-500 font-semibold">
              Total Users
            </h5>
            <p className="text-slate-400 text-3xl font-extrabold">
              {users?.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
