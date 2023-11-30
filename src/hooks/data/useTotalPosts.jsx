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
      const data = await axios.get(
        "https://exforum24.vercel.app/posts/totalPosts"
      );
      return data.data.totalPosts;
    },
  });

  return { isPending, isLoading, error, totalPosts, refetch };
};

export default useTotalPosts;
