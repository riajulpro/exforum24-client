import useSingleUser from "../../../hooks/data/useSingleUser";

const AdminProfile = () => {
  const { userInfo } = useSingleUser();

  const { _id, name, email, isAdmin, isMember, badges, profile_picture } =
    userInfo || {};

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
    </div>
  );
};

export default AdminProfile;
