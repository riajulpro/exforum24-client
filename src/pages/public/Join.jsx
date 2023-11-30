import { Link, useNavigate } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import { updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Authentication";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axios, { Axios } from "axios";
import { Helmet } from "react-helmet";

const Join = () => {
  const navigateTo = useNavigate();

  const { user } = useContext(AuthContext);

  const [password, setPassword] = useState(null);

  const passwordHandler = () => {
    const passwordValue = document.getElementById("password").value;
    setPassword(passwordValue);
  };

  const { createUser, googleSignIn } = useContext(AuthContext);

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

  const signUpFormSubmit = (data) => {
    const { username, picture, email } = data;

    const userBody = {
      name: username,
      profile_picture: picture,
      email,
      password,
      badges: ["Bronze Badge"],
    };

    if (/^(?=.*[A-Z])(?=.*[\W_]).{6,}$/.test(password)) {
      createUser(email, password)
        .then((result) => {
          updateProfile(result.user, {
            displayName: username,
            photoURL: picture,
          })
            .then(() => {
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
                  navigateTo("/login");
                })
                .catch((err) => console.log(err));
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      return;
    }
  };

  return (
    <>
      <Helmet>
        <title>Join Us</title>
      </Helmet>
      <div className="md:h-screen flex md:justify-center items-center">
        <div className="w-11/12 my-5 md:m-0 mx-auto md:2/3 lg:w-1/2 md:h-auto lg:h-auto flex flex-col-reverse md:flex-row rounded-md shadow-md overflow-hidden">
          {/* left */}
          <div className="bg-blue-600 flex flex-col justify-between items-center flex-1 p-5">
            <h1 className="font-bold text-2xl text-white">
              Welcome to Register
            </h1>
            <p className="text-justify text-white">
              If you want to access all of our features and events, you must
              login first. Register user can access all of our facilities and
              advanced features.
            </p>
            <div className="mt-4 md:mt-0">
              <h3 className="text-center">Or Sign Up Using</h3>
              <div className="flex gap-1 justify-center items-center mt-2">
                <button onClick={googleLogin}>
                  <AiFillGoogleCircle className="w-9 h-9 hover:text-white" />
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
              <Link to={"/login"}>Login</Link>
              <Link to={"/join"}>
                <button className="px-3 py-2 ml-2 bg-secondary text-white font-bold rounded-md">
                  Join
                </button>
              </Link>
            </div>
            <form
              onSubmit={handleSubmit(signUpFormSubmit)}
              className="flex flex-col gap-1"
            >
              <h5 className="font-bold">Full Name</h5>
              <input
                type="text"
                {...register("username")}
                className="w-full p-2 outline-none border-b"
                placeholder="Enter your full-name"
              />
              <h5 className="font-bold">Profile Picture (link)</h5>
              <input
                type="text"
                {...register("picture")}
                className="w-full p-2 outline-none border-b"
                placeholder="Enter link of the picture"
              />
              <h5 className="font-bold">Email</h5>
              <input
                type="email"
                {...register("email")}
                className="w-full p-2 outline-none border-b"
                placeholder="Enter your email"
              />
              <h5 className="font-bold">Password</h5>
              <input
                onChange={passwordHandler}
                type="password"
                name="password"
                id="password"
                className="w-full p-2 outline-none border-b"
                placeholder="Enter your password"
              />
              {/^(?=.*[A-Z])(?=.*[\W_]).{6,}$/.test(password) ? (
                <div className="bg-yellow-100 border p-1 border-red-400">
                  <p className="text-xs">Strong password</p>
                </div>
              ) : (
                <div className="bg-yellow-100 border p-1 border-red-400">
                  <p className="text-xs">
                    You must have at least 6 characters include with a capital
                    letter & a special character.
                  </p>
                </div>
              )}
              <input
                type="submit"
                value="Register"
                className="w-full rounded-md p-2 bg-blue-600 hover:bg-blue-400 text-white font-semibold"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Join;
