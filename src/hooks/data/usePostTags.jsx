import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePostTags = () => {
  const {
    isFetching,
    isLoading,
    error,
    refetch,
    data: allTags,
  } = useQuery({
    queryKey: ["allPostTagsData"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/tags`, {
        withCredentials: true,
      });
      return await res.data.data;
    },
  });

  return { isFetching, isLoading, error, allTags, refetch };
};

export default usePostTags;
