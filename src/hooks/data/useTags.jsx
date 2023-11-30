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
      const data = await axios.get("https://exforum24.vercel.app/posts/tags");
      return await data.data.uniqueTags;
    },
  });

  return { isPending, isLoading, error, tags, refetch };
};

export default useTags;
