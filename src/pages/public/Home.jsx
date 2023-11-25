import Posts from "../../components/Home/Posts";

const Home = () => {
  return (
    <div className="md:w-9/12 mx-auto grid grid-cols-12 gap-1 my-5">
      <div className="col-span-2">Left</div>
      <div className="col-span-7">
        <Posts username="John Doe" timestamp="2 hours ago" />
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};

export default Home;
