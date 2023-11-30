import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://exforum24.vercel.app",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
