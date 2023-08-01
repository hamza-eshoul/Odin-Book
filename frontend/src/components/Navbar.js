import React, { useEffect, useState } from "react";
import odinBookLogo from "../images/odin-book.jpeg";
import defaultProfile from "../images/defaultProfile.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUserFriends } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = ({ setIsAddPostActive }) => {
  const [isNavBarActive, setIsNavbarActive] = useState(true);
  const [isUserMenuActive, setIsUserMenuActive] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const { logout } = useLogout();
  const location = useLocation();

  const dynamicallyNavigateToProfile = () => {
    const path = location.pathname.split("/")[1];

    if (path === "profile") {
      navigate(`/profile/${user._id}/`);
      window.location.reload();
    } else {
      navigate(`/profile/${user._id}/`);
    }
  };

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      setIsNavbarActive(false);
    } else {
      setIsNavbarActive(true);
    }
  }, [location]);

  return (
    <nav
      className={`${
        isNavBarActive ? "" : "hidden"
      } h-16 bg-white shadow-md flex justify-between items-center fixed w-full px-6 z-10`}
    >
      {/*  Odin Book Logo */}
      <Link to="/homepage">
        <div className="flex gap-3 justify-center items-center h-full ">
          {/* odin book logo */}
          <div className="h-12 w-12 ">
            <img
              src={odinBookLogo}
              alt="odin book logo"
              className="h-full w-full rounded-full "
            />
          </div>

          {/* odin book text */}
          <p className="text-blue-700 text-2xl font-bold"> Odin Book</p>
        </div>
      </Link>

      {/* Tabs */}
      <div className="flex gap-32 h-full">
        {" "}
        {/* Home */}
        <NavLink
          to="/homepage"
          className="flex flex-col items-center w-28 pt-2"
        >
          <FaHome className="text-blue-600 text-3xl" />
          <h3 className="font-medium text-sm"> Home</h3>
        </NavLink>
        {/* Friends */}
        <NavLink
          to="/friends/"
          className="flex flex-col items-center w-28 pt-2"
        >
          <FaUserFriends className="text-blue-600 text-3xl" />
          <h3 className="font-medium text-sm"> Friends</h3>
        </NavLink>
        {/* Add Post */}
        <div
          className="flex flex-col items-center w-28 pt-2 cursor-pointer"
          onClick={() => {
            setIsAddPostActive(true);
          }}
        >
          <MdAddCircle className="text-blue-600 text-3xl" />
          <h3 className="font-medium text-sm"> Post</h3>
        </div>
      </div>

      {/* User panel */}
      <div
        className="h-12 w-12 object-fit relative"
        onClick={() => setIsUserMenuActive(!isUserMenuActive)}
      >
        {user && (
          <img
            src={user.profileImg.url ? user.profileImg.url : defaultProfile}
            alt="User Image"
            className="h-full w-full rounded-full cursor-pointer"
          />
        )}

        {/* user popup menu */}
        {isUserMenuActive && (
          <ul className="flex flex-col bg-white border-[0.5px] absolute top-16 w-32 right-2.5 p-1.5 font-medium rounded-md shadow-sm">
            {" "}
            <li
              className="hover:bg-sky-100 transition duration-300 rounded-md px-2.5 py-1.5 cursor-pointer"
              onClick={() => {
                dynamicallyNavigateToProfile();
              }}
            >
              {" "}
              View Profile
            </li>
            <li className="hover:bg-sky-100 transition duration-300 rounded-md px-2.5 py-1.5 cursor-pointer">
              {" "}
              Settings
            </li>
            <Link to="/login" onClick={logout}>
              <li className="hover:bg-sky-100 transition duration-300 rounded-md px-2.5 py-1.5 cursor-pointer">
                {" "}
                Log out
              </li>
            </Link>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
