import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useComments = () => {
  const {
    isPending,
    isLoading,
    error,
    data: comments,
    refetch,
  } = useQuery({
    queryKey: ["commentsData"],
    queryFn: async () => {
      const data = await axios.get("https://exforum24.vercel.app/comments");
      return await data.data.data;
    },
  });

  return { isPending, isLoading, error, comments, refetch };
};

export default useComments;
