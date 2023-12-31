import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUsersForAdmin = (currentPage) => {
  const {
    isPending,
    isLoading,
    error,
    refetch,
    data: usersForAdmin,
  } = useQuery({
    queryKey: ["allUsersForAdminData"],
    queryFn: async () => {
      const data = await axios.get(
        `https://exforum24.vercel.app/users/pages?page=${currentPage + 1}`
      );
      return data.data;
    },
  });

  return { isPending, isLoading, error, usersForAdmin, refetch };
};

export default useUsersForAdmin;
