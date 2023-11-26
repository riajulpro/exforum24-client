import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const AnnouncementDetails = () => {
  const { id } = useParams();
  const { data: announcement = [] } = useQuery({
    queryKey: ["singleAnnouncement"],
    queryFn: async () => {
      const data = await axios.get(`http://localhost:5000/announcements/${id}`);
      return data.data.result;
    },
  });

  console.log(announcement);
  return (
    <div className="w-9/12 mx-auto grid grid-cols-12 my-5">
      <div className="col-span-2"></div>
      <div className="col-span-7">
        {announcement.map((ann) => (
          <div key={ann._id} className="bg-white">
            <h1 className="text-3xl border-b mb-2 p-5">{ann.title}</h1>
            <p className="text-sm px-5 py-3">{ann.content}</p>
          </div>
        ))}
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};

export default AnnouncementDetails;
