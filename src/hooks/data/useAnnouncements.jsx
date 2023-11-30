import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAnnouncements = () => {
  const {
    isPending,
    isLoading,
    error,
    refetch,
    data: announcements,
  } = useQuery({
    queryKey: ["announcementData"],
    queryFn: async () => {
      const data = await axios.get(
        "https://exforum24.vercel.app/announcements",
        {
          withCredentials: true,
        }
      );
      return await data.data.data;
    },
  });

  return { isPending, isLoading, error, announcements, refetch };
};

export default useAnnouncements;
