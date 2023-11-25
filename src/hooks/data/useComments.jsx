import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useComments = () => {
  const {
    isPending,
    isLoading,
    error,
    data: comments,
  } = useQuery({
    queryKey: ["commentsData"],
    queryFn: async () => {
      const data = await axios.get("http://localhost:5000/comments");
      return await data.data.data;
    },
  });

  return { isPending, isLoading, error, comments };
};

export default useComments;
