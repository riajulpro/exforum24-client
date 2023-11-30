import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePosts = (currentPage) => {
  const {
    isFetching,
    isLoading,
    error,
    refetch,
    data: posts,
  } = useQuery({
    queryKey: ["postsData", currentPage],
    queryFn: async () => {
      const data = await axios.get(
        `https://exforum24.vercel.app/posts?page=${currentPage + 1}`
      );
      return await data.data;
    },
  });

  return { isFetching, isLoading, error, posts, refetch };
};

export default usePosts;
