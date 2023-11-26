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

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { announcements = [] } = useAnnouncements();

  const [notificationCount, setNotificationCount] = useState(0);
  useEffect(() => {
    setNotificationCount(announcements.length);
  }, [announcements]);

  const [membership] = useState(false);

  const { user } = useContext(AuthContext);

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

  return (
    <nav className="bg-white text-secondary p-1 sticky top-0 z-10 shadow">
      <div className="md:w-9/12 mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">ExForum24</div>
        <ul className="flex space-x-1 items-center uppercase">
          <li>
            <NavLink
              to="/"
              className="flex items-center gap-1 hover:bg-action p-2 rounded duration-150 ease-in"
            >
              <RiHome2Line className="w-6 h-6" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/membership"
              className="flex items-center gap-1 hover:bg-action p-2 rounded duration-150 ease-in"
            >
              {membership ? (
                <RiVipCrownFill className="w-6 h-6" />
              ) : (
                <RiVipCrownLine className="w-6 h-6" />
              )}{" "}
              Membership
            </NavLink>
          </li>
          <li className="hover:bg-action p-2 rounded duration-150 ease-in relative">
            {notificationCount > 0 ? (
              <IoMdNotifications className="w-6 h-6" />
            ) : (
              <IoMdNotificationsOutline className="w-6 h-6" />
            )}
            {notificationCount > 0 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full text-[10px] select-none">
                {notificationCount}
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
                  src="https://th.bing.com/th/id/OIP.2r5wqEPi_CvcNGmUprinPwHaIB?rs=1&pid=ImgDetMain" // Replace with your profile picture source
                  alt="Profile"
                  className="w-6 h-6 rounded-full"
                />
              </button>
              {isDropdownOpen && (
                <div className="z-20 absolute right-0 mt-2 bg-white rounded-sm shadow-md w-64 border border-gray-100">
                  <div className="border-b border-gray-200 p-3">
                    <img
                      src="https://th.bing.com/th/id/OIP.2r5wqEPi_CvcNGmUprinPwHaIB?rs=1&pid=ImgDetMain" // Replace with your profile picture source
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex items-center gap-1 justify-between">
                      <p className="text-gray-800 font-semibold mt-1">
                        RiaJul Pro
                      </p>
                      <IoIosArrowForward />
                    </div>
                  </div>
                  <div>
                    <Link
                      to=""
                      className="flex items-center gap-1 text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-3 py-1"
                    >
                      <RiDashboardLine /> Dashboard
                    </Link>
                    <button className="flex items-center gap-1 px-3 py-1 text-gray-700 hover:text-red-500 hover:bg-gray-50 w-full text-left">
                      <BiLogOut /> Logout
                    </button>
                  </div>
                </div>
              )}
            </li>
          ) : (
            <li>
              <button className="bg-secondary text-white rounded-full px-3 py-1 uppercase text-sm hover:opacity-90">
                Join Us
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
