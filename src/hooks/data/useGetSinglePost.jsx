import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetSinglePost = (id) => {
  const {
    isFetching,
    isLoading,
    error,
    refetch,
    data: singlePost,
  } = useQuery({
    queryKey: ["singlePostData", id],
    queryFn: async () => {
      const data = await axios.get(`http://localhost:5000/posts/${id}`);
      return await data.data.data;
    },
  });

  return { isFetching, isLoading, error, singlePost, refetch };
};

export default useGetSinglePost;
