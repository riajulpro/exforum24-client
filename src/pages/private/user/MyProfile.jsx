import { useEffect, useState } from "react";
import Posts from "../../../components/Home/Posts";
import useSingleUser from "../../../hooks/data/useSingleUser";
import axios from "axios";

const MyProfile = () => {
  const [myPosts, setMyPosts] = useState([]);

  // ------------------------------------------------------------
  const { userInfo } = useSingleUser();

  const firstUser = userInfo?.find((user, index) => index === 0);

  const { _id, name, email, isAdmin, isMember, badges, profile_picture } =
    firstUser || {};
  // ------------------------------------------------------------

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/mine/${_id}`)
      .then((res) => setMyPosts(res.data.data))
      .catch((err) => console.log(err));
  }, [_id]);

  return (
    <div>
      {userInfo?.map((user) => (
        <div
          key={user._id}
          className="text-center p-3 bg-white m-2 rounded shadow-md"
        >
          <div className="flex justify-center">
            <img
              src={user.profile_picture}
              alt=""
              className="w-20 h-20 rounded-full border-2 border-violet-500"
            />
          </div>
          <h3 className="text-3xl font-semibold">{user.name}</h3>
          <p className="text-slate-500">{user.email}</p>
          <p>
            {user.badges.map((badge, idx) => (
              <p key={idx}>{badge}</p>
            ))}
          </p>
          <p>
            {user.isAdmin
              ? "Admin"
              : user.isMember
              ? "Premium Member"
              : "New User"}
          </p>
        </div>
      ))}
      <div className="p-3 bg-white m-2 rounded shadow-md">
        <h5 className="text-xl mb-2">My recent posts: </h5>
        <div>
          {myPosts.slice(0, 3).map((post) => (
            <Posts key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
