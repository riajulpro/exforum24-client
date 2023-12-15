import { useState, useEffect, useRef, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  IoMdNotificationsOutline,
  IoMdNotifications,
  IoIosArrowForward,
} from "react-icons/io";
import { RiDashboardLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { RiVipCrownLine, RiVipCrownFill, RiHome2Line } from "react-icons/ri";
import useAnnouncements from "../../hooks/data/useAnnouncements";
import { AuthContext } from "../../context/Authentication";
import Announcement from "../Home/Announcement";
import useSingleUser from "../../hooks/data/useSingleUser";
import axios from "axios";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  const { announcements = [] } = useAnnouncements();
  const { user, logOut } = useContext(AuthContext);

  const signOut = () => {
    logOut()
      .then(() => console.log("successfully singing out"))
      .catch((err) => {
        console.log(err);
      });
  };

  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    setNotificationCount(announcements.length);
  }, [announcements]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleNotification = () => {
    setNotificationOpen(!isDropdownOpen);
  };

  const handleClickOutsideNotification = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setNotificationOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideNotification);

    return () => {
      document.removeEventListener("click", handleClickOutsideNotification);
    };
  }, []);

  const [searchResult, setSearchResult] = useState([]);

  return (
    <nav className="bg-white text-secondary p-1 sticky top-0 z-10 shadow">
      <div className="md:w-9/12 mx-auto flex justify-between items-center">
        <div className="text-xs md:text-xl font-bold">
          <Link to={"/"}>ExForum24</Link>
        </div>
        <ul className="flex space-x-1 items-center uppercase">
          <li>
            <NavLink
              to="/"
              className="flex items-center gap-1 hover:bg-action p-2 rounded duration-150 ease-in"
            >
              <RiHome2Line className="w-4 md:w-6 h-4 md:h-6" />{" "}
              <span className="hidden md:inline">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/membership"
              className="flex items-center gap-1 hover:bg-action p-2 rounded duration-150 ease-in"
            >
              <RiVipCrownLine className="w-4 md:w-6 h-4 md:h-6" />
              <span className="hidden md:inline">Membership</span>
            </NavLink>
          </li>
          <li className="relative" ref={notificationRef}>
            <button
              onClick={toggleNotification}
              className="hover:bg-action p-2 rounded duration-150 ease-in"
            >
              {notificationCount > 0 ? (
                <IoMdNotifications className="w-4 md:w-6 h-4 md:h-6" />
              ) : (
                <IoMdNotificationsOutline className="w-4 md:w-6 h-4 md:h-6" />
              )}
              {notificationCount > 0 && (
                <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full text-[5px] md:text-[10px] select-none">
                  {notificationCount}
                </div>
              )}
            </button>
            {isNotificationOpen && (
              <div className="z-20 absolute right-0 mt-2 bg-white rounded-sm shadow-md w-64 border border-gray-100 text-xs">
                <Announcement />
              </div>
            )}
          </li>

          {user ? (
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="text-white hover:text-gray-300 hover:bg-action p-2 rounded duration-150 ease-in"
              >
                <img
                  src={
                    user?.photoURL ||
                    "https://th.bing.com/th/id/R.a6e328f484dfaee5cff22431f5c61cab?rik=QtxCe0VZ6bQvjQ&pid=ImgRaw&r=0"
                  }
                  alt="Profile"
                  className="w-6 h-6 rounded-full border object-cover"
                />
              </button>
              {isDropdownOpen && (
                <div className="z-20 absolute right-0 mt-2 bg-white rounded-sm shadow-md w-64 border border-gray-100">
                  <div className="border-b border-gray-200 p-3">
                    <img
                      src={
                        user?.photoURL ||
                        "https://th.bing.com/th/id/R.a6e328f484dfaee5cff22431f5c61cab?rik=QtxCe0VZ6bQvjQ&pid=ImgRaw&r=0"
                      }
                      alt="Profile"
                      className="w-8 h-8 rounded-full border object-cover"
                    />
                    <div className="flex items-center gap-1 justify-between">
                      <p className="text-gray-800 font-semibold mt-1">
                        {user?.displayName}
                      </p>
                      <IoIosArrowForward />
                    </div>
                  </div>
                  <div>
                    <Link
                      to="/user-dashboard"
                      className="flex items-center gap-1 text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-3 py-1"
                    >
                      <RiDashboardLine /> Dashboard
                    </Link>
                    <button
                      onClick={signOut}
                      className="flex items-center gap-1 px-3 py-1 text-gray-700 hover:text-red-500 hover:bg-gray-50 w-full text-left"
                    >
                      <BiLogOut /> Logout
                    </button>
                  </div>
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link
                to={"/join"}
                className="bg-secondary text-white rounded-full px-3 py-1 uppercase text-sm hover:opacity-90"
              >
                Join Us
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
