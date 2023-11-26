import useAnnouncements from "../../hooks/data/useAnnouncements";

const Announcement = () => {
  const { announcements = [] } = useAnnouncements();

  return (
    <div className="sticky top-[70px]">
      <div className="bg-white">
        <p className="font-semibold border-b p-3">Announcements</p>
        {announcements.map((ann) => (
          <div className="p-3 hover:bg-action cursor-pointer" key={ann._id}>
            📢{ann.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
