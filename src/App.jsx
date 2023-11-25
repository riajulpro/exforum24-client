import usePosts from "./hooks/data/usePosts";

const App = () => {
  const {posts} = usePosts();
  console.log(posts);

  return (
    <div>
      <h1>Initializing the Client Side</h1>
    </div>
  );
};

export default App;
