import Announcement from "../../components/Home/Announcement";
import PostSection from "../../components/Home/PostSection";

const Home = () => {
  return (
    <div className="md:w-9/12 mx-auto grid grid-cols-12 gap-3 my-5">
      <div className="col-span-2">Left</div>
      <div className="col-span-7">
        <PostSection />
      </div>
      <div className="col-span-3">
        <Announcement />
      </div>
    </div>
  );
};

export default Home;
