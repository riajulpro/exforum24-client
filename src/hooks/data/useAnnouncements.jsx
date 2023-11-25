import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAnnouncements = () => {
  const {
    isPending,
    isLoading,
    error,
    data: announcements,
  } = useQuery({
    queryKey: ["commentsData"],
    queryFn: async () => {
      const data = await axios.get("http://localhost:5000/announcements");
      return await data.data.data;
    },
  });

  return { isPending, isLoading, error, announcements };
};

export default useAnnouncements;
