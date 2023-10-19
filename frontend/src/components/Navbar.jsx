import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

// images
import odinBookLogo from "../assets/images/odin-book.jpeg";
import defaultProfile from "../assets/images/defaultProfile.png";

// icons
import { FaHome, FaUserFriends } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

// components
import NavMenu from "./NavMenu";

const Navbar = ({ setIsAddPostActive }) => {
  const [isNavMenu, setIsNavMenu] = useState(false);
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  return (
    <nav className="fixed z-10 flex h-[72px] w-full items-center justify-between border-b-[1.5px] border-zinc-200 bg-white px-6">
      <Link to="/homepage" className="flex items-center gap-2">
        <div className="h-12 w-12 ">
          <img
            src={odinBookLogo}
            alt="odin book logo"
            className="h-full w-full rounded-full "
          />
        </div>
        <p className="text-lg font-medium text-darkBlue">Odin Book</p>
      </Link>

      <div className="flex h-full translate-x-6 gap-32">
        <NavLink
          to="/homepage"
          className="flex w-28 flex-col items-center pt-3"
        >
          <FaHome className="text-3xl text-mainBlue" />
          <h3 className="text-sm"> Home</h3>
        </NavLink>
        <NavLink to="/friends" className="flex w-28 flex-col items-center pt-3">
          <FaUserFriends className="text-3xl text-mainBlue" />
          <h3 className="text-sm"> Friends</h3>
        </NavLink>
        <div
          className="flex w-28 cursor-pointer flex-col items-center pt-3"
          onClick={() => {
            setIsAddPostActive(true);
          }}
        >
          <MdAddCircle className="text-3xl text-mainBlue" />
          <h3 className="text-sm"> Post</h3>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="object-fit h-12 w-12">
          {user && (
            <img
              src={user.profileImg.url ? user.profileImg.url : defaultProfile}
              alt="User Image"
              className="h-full w-full cursor-pointer rounded-full"
            />
          )}
        </div>
        <p className="font-medium opacity-80">
          {user.firstName} {user.lastName}{" "}
        </p>
        <MdKeyboardArrowDown
          className="cursor-pointer text-2xl hover:opacity-70"
          onClick={() => setIsNavMenu(!isNavMenu)}
        />

        {isNavMenu && <NavMenu user={user} />}
      </div>
    </nav>
  );
};

export default Navbar;
