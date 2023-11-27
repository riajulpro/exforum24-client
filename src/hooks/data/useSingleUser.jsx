import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSingleUser = (email) => {
  const {
    isFetching,
    isLoading,
    error,
    refetch,
    data: currentUser,
  } = useQuery({
    queryKey: ["singleUserData", email],
    queryFn: async () => {
      const data = await axios.get(`http://localhost:5000/users/${email}`);
      return await data.data.data;
    },
  });

  return { isFetching, isLoading, error, currentUser, refetch };
};

export default useSingleUser;
