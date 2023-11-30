import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center">
        <h3 className="text-9xl font-extrabold">404</h3>
        <p className="text-3xl font-semibold mb-5">You are in a wrong path.</p>
        <Link
          to={"/"}
          className="bg-violet-600 hover:bg-violet-500 py-2 px-3 rounded hover:shadow-md text-white font-semibold"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
