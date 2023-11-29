import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/Authentication";

const useSingleUser = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return {
      isLoading: true,
      error: null,
      userInfo: [],
    };
  }

  const userEmail = user?.email;

  const {
    isLoading,
    error,
    data: userInfo,
  } = useQuery({
    queryKey: ["singleUserData", userEmail],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/${userEmail}`
        );
        return response.data.data || null;
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    },
  });

  return { isLoading, error, userInfo };
};

export default useSingleUser;
