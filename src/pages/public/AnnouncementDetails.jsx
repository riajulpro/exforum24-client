import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAnnouncements from "../../hooks/data/useAnnouncements";
import { Helmet } from "react-helmet";

const AnnouncementDetails = () => {
  const { id } = useParams();

  const { announcements = [] } = useAnnouncements();

  const currentAnnounce = announcements.filter((ann) => ann._id === id);

  return (
    <>
      <Helmet>
        <title>Announcement Details</title>
      </Helmet>
      <div className="w-11/12 md:w-9/12 mx-auto grid grid-cols-12 my-5">
        <div className="col-span-12 md:col-span-2"></div>
        <div className="col-span-12 md:col-span-7">
          {currentAnnounce?.map((ann) => (
            <div key={ann._id} className="bg-white">
              <h1 className="text-xl md:text-3xl border-b mb-2 p-5">
                {ann.title}
              </h1>
              <p className="text-sm px-5 py-3">{ann.content}</p>
            </div>
          ))}
        </div>
        <div className="col-span-12 md:col-span-3"></div>
      </div>
    </>
  );
};

export default AnnouncementDetails;
