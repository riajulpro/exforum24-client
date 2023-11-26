import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useTags = () => {
  const {
    isPending,
    isLoading,
    error,
    data: tags,
    refetch,
  } = useQuery({
    queryKey: ["tagsData"],
    queryFn: async () => {
      const data = await axios.get("http://localhost:5000/posts/tags");
      return await data.data.uniqueTags;
    },
  });

  return { isPending, isLoading, error, tags, refetch };
};

export default useTags;
