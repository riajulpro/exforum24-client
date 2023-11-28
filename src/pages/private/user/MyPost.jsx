import { useEffect, useState } from "react";
import useSingleUser from "../../../hooks/data/useSingleUser";
import axios from "axios";
import Posts from "../../../components/Home/Posts";

const MyPost = () => {
  const [myPosts, setMyPosts] = useState([]);

  const { userInfo } = useSingleUser();

  const firstUser = userInfo?.find((user, index) => index === 0);

  const { _id, name, email, isAdmin, isMember, badges, profile_picture } =
    firstUser || {};

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/mine/${_id}`)
      .then((res) => setMyPosts(res.data.data))
      .catch((err) => console.log(err));
  }, [_id]);

  return (
    <div className="m-2">
      {myPosts.map((post) => (
        <Posts key={post._id} post={post} />
      ))}
    </div>
  );
};

export default MyPost;
