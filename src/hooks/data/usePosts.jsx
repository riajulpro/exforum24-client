import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePosts = () => {
  const {
    isPending,
    isLoading,
    error,
    data: posts,
  } = useQuery({
    queryKey: ["postsData"],
    queryFn: async () => {
      const data = await axios.get("http://localhost:5000/posts");
      return await data.data;
    },
  });

  return { isPending, isLoading, error, posts };
};

export default usePosts;
