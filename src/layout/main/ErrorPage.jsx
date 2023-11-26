import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <p className="text-3xl font-semibold">You are in a wrong path.</p>
        <Link to={"/"}>Back to home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
