import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUsers = () => {
  const {
    isPending,
    isLoading,
    error,
    data: users,
  } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const data = await axios.get("http://localhost:5000/users");
      return await data.data.data;
    },
  });

  return { isPending, isLoading, error, users };
};

export default useUsers;
