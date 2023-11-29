import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useTotalPosts = () => {
  const {
    isPending,
    isLoading,
    error,
    refetch,
    data: totalPosts,
  } = useQuery({
    queryKey: ["totalPosts"],
    queryFn: async () => {
      const data = await axios.get("http://localhost:5000/posts/totalPosts");
      return data.data.totalPosts;
    },
  });

  return { isPending, isLoading, error, totalPosts, refetch };
};

export default useTotalPosts;
