import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// https://exforum24.vercel.app

const usePosts = (currentPage, sort) => {
  const {
    isFetching,
    isLoading,
    error,
    refetch,
    data: posts,
  } = useQuery({
    queryKey: ["postsData", currentPage, sort],
    queryFn: async () => {
      const data = await axios.get(
        `https://exforum24.vercel.app/posts?page=${
          currentPage + 1
        }&sort=${sort}`
      );
      return await data.data;
    },
  });

  return { isFetching, isLoading, error, posts, refetch };
};

export default usePosts;
