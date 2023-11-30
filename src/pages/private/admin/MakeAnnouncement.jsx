import { useForm } from "react-hook-form";
import useSingleUser from "../../../hooks/data/useSingleUser";
import axios from "axios";
import Swal from "sweetalert2";
import AnnouncementFrame from "../../../components/AdminDashboard/AnnouncementFrame";
import useAnnouncements from "../../../hooks/data/useAnnouncements";

const MakeAnnouncement = () => {
  const { handleSubmit, register, reset } = useForm();

  const { userInfo = {} } = useSingleUser();

  const { refetch } = useAnnouncements();

  const { _id } = userInfo;

  const onSubmit = (data) => {
    const { title, content } = data;

    const announcement = {
      title,
      content,
      author: _id,
    };

    axios
      .post("http://localhost:5000/announcements", announcement, {
        withCredentials: true,
      })
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Announcement has been added",
          showConfirmButton: false,
          timer: 1500,
        });

        reset();

        refetch();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="p-3 bg-white m-2 rounded shadow-md">
        <h4 className="text-lg md:text-xl font-semibold mb-2">
          Create an Announcement:
        </h4>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("title", { required: "This field is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="enter the announcement"
            />
            <textarea
              {...register("content", { required: "This field is required" })}
              rows="10"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
              placeholder="enter the content of the announcement..."
            ></textarea>
            <input
              type="submit"
              value="Make Announcement"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </form>
        </div>
      </div>
      <div>
        <AnnouncementFrame />
      </div>
    </div>
  );
};

export default MakeAnnouncement;
