import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/Authentication";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import axios from "axios";

const Login = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState(null);

  const { signIn, googleSignIn } = useContext(AuthContext);

  const googleLogin = () => {
    googleSignIn()
      .then((res) => {
        const { displayName, email, photoURL } = res.user;

        const userBody = {
          name: displayName,
          email,
          profile_picture: photoURL,
          badges: ["Bronze Badge"],
        };

        axios
          .post("https://exforum24.vercel.app/users", userBody, {
            withCredentials: true,
          })
          .then(() => {
            Swal.fire(
              "You have successfully register!",
              "Please login now!",
              "success"
            );
            navigateTo("/");
          })
          .catch((err) => {
            console.log(err);
            navigateTo("/");
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const { register, handleSubmit } = useForm();

  const login = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        Swal.fire(
          "You have successfully login!",
          "Now you can access all features.",
          "success"
        );
        navigateTo("/");
      })
      .catch(() => {
        setLoginError("Invalid email or password");
      });
  };

  return (
    <>
      <Helmet>
        <title>Login Now</title>
      </Helmet>
      <div className="md:h-screen flex md:justify-center items-center bg-gray-400">
        <div className="w-11/12 my-5 md:m-0 mx-auto md:w-2/3 lg:w-1/2 md:h-auto lg:h-2/3 flex flex-col-reverse md:flex-row rounded-md shadow-md overflow-hidden">
          {/* left */}
          <div className="bg-blue-600 flex flex-col justify-between items-center flex-1 p-5">
            <h1 className="font-bold text-2xl text-white">Welcome to Login</h1>
            <p className="text-justify text-slate-200">
              If you want to access all of our features and events, you must
              login first. Login user can access all of our facilities and
              advanced features.
            </p>
            <div className="mt-4 md:mt-0">
              <h3 className="text-center text-slate-100">Or Sign Up Using</h3>
              <div className="flex gap-1 justify-center items-center mt-2">
                <button
                  onClick={googleLogin}
                  className="hover:text-white flex gap-2 items-center bg-white hover:bg-secondary p-2 rounded-md"
                >
                  <AiFillGoogleCircle className="w-9 h-9" /> Continue with
                  Google
                </button>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="flex-1 p-5 bg-white">
            <div className="mb-3 text-center">
              <Link to={"/"} className="mr-2">
                Home
              </Link>
              <Link to={"/login"}>
                <button className="px-3 py-2 mr-2 rounded bg-secondary text-white font-bold">
                  Login
                </button>
              </Link>
              <Link to={"/join"}>Join</Link>
            </div>
            <form
              onSubmit={handleSubmit(login)}
              className="flex flex-col gap-3"
            >
              {loginError ? (
                <div className="bg-yellow-100 text-center border border-red-400">
                  <h5 className="font-bold text-sm">Wrong Credential</h5>
                  <p className="text-xs">{loginError}</p>
                </div>
              ) : (
                ""
              )}
              <h5 className="font-bold">Email</h5>
              <input
                type="email"
                {...register("email")}
                className="w-full p-2 outline-none border-b"
                placeholder="Enter your email"
              />
              <h5 className="font-bold">Password</h5>
              <input
                type="password"
                {...register("password")}
                className="w-full p-2 outline-none border-b"
                placeholder="Enter your password"
              />
              <input
                type="submit"
                value="Login"
                className="w-full rounded p-2 bg-blue-400 hover:bg-blue-600 text-white font-semibold"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
