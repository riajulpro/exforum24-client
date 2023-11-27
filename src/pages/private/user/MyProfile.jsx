import { useContext } from "react";
import { AuthContext } from "../../../context/Authentication";
import useSingleUser from "../../../hooks/data/useSingleUser";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  let userEmail = "";

  if (user) {
    let userEmail = user.email;
    console.log(userEmail);
  }

  const { currentUser = [], isLoading } = useSingleUser(userEmail);

  if (isLoading) {
    return "Loading...";
  }

  const { name, email, profile_picture, badges, isMember, isAdmin } =
    currentUser[0];

  return (
    <div>
      <div className="border-b-4 border-blue-400 p-8 bg-white m-4">
        <img
          src={profile_picture}
          alt={`${name}'s profile`}
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border border-gray-200"
        />
        <h2 className="text-2xl font-bold text-gray-800 text-center">{name}</h2>
        <p className="text-gray-600 text-center text-sm">{email}</p>
        <div className="flex justify-center space-x-4 text-xs">
          {badges.map((badge, idx) => (
            <span key={idx}>{badge}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
