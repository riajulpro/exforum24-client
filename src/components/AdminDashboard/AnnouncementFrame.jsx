import useAnnouncements from "../../hooks/data/useAnnouncements";
import AnnouncementTable from "./AnnouncementTable";

const AnnouncementFrame = () => {
  const { announcements = [], refetch } = useAnnouncements();

  return (
    <div className="m-2">
      <AnnouncementTable announcements={announcements} refetch={refetch} />
    </div>
  );
};

export default AnnouncementFrame;
