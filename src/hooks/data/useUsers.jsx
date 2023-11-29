import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUsers = () => {
  const {
    isPending,
    isLoading,
    error,
    refetch,
    data: users,
  } = useQuery({
    queryKey: ["allUsersData"],
    queryFn: async () => {
      const data = await axios.get("http://localhost:5000/users");
      return data.data.data;
    },
  });

  return { isPending, isLoading, error, users, refetch };
};

export default useUsers;
