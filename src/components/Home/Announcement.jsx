import { Link } from "react-router-dom";
import useAnnouncements from "../../hooks/data/useAnnouncements";

const Announcement = () => {
  const { announcements = [] } = useAnnouncements();

  return (
    <div className="sticky top-[70px]">
      <div className="bg-white">
        <p className="font-semibold border-b p-3">Announcements</p>
        {announcements.map((ann) => (
          <Link key={ann._id} to={`/announcement-details/${ann._id}`}>
            <div className="p-3 hover:bg-action cursor-pointer">
              📢{ann.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
