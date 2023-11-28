import { useEffect, useState } from "react";
import useSingleUser from "../../../hooks/data/useSingleUser";

const MyPost = () => {
  const [myPosts, setMyPosts] = useState([]);

  const { userInfo } = useSingleUser();

  const { _id, name, email, isAdmin, isMember, badges, profile_picture } =
    userInfo[0];

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/mine/${_id}`)
      .then((res) => setMyPosts(res.data.data))
      .catch((err) => console.log(err));
  }, [_id]);

  return <div></div>;
};

export default MyPost;
