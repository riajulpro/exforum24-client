import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useReports = (currentPage) => {
  const {
    isPending,
    isLoading,
    error,
    data: reports,
    refetch,
  } = useQuery({
    queryKey: ["reportsData"],
    queryFn: async () => {
      const data = await axios.get(
        `https://exforum24.vercel.app/reports?page=${currentPage + 1}`,
        {
          withCredentials: true,
        }
      );
      return await data.data;
    },
  });

  return { isPending, isLoading, error, reports, refetch };
};

export default useReports;
