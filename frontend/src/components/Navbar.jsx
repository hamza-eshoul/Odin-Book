import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import { usePostContext } from "../hooks/useContext/usePostContext";

// images
import odinBookLogo from "../assets/images/odin-book.jpeg";
import defaultProfile from "../assets/images/defaultProfile.png";

// icons
import { FaHome, FaUserFriends } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

// components
import NavMenu from "./NavMenu";

const Navbar = () => {
  const [isNavMenu, setIsNavMenu] = useState(false);
  const { user } = useAuthContext();
  const { dispatch } = usePostContext();

  if (!user) {
    return null;
  }

  return (
    <nav className="fixed z-50 flex h-[72px] w-full items-center justify-center gap-8 border-b-[1.5px] border-zinc-200 bg-white px-2 xsm:gap-12 md:px-6 xmd:justify-between xmd:gap-0">
      <Link to="/homepage" className="hidden items-center gap-2 xmd:flex">
        <img
          src={odinBookLogo}
          alt="odin book logo"
          className="h-12 w-12 rounded-full "
        />

        <span className="text-lg font-medium text-darkBlue">Odin Book</span>
      </Link>

      <ul className="flex h-full translate-x-6 gap-6 xsm:gap-10 xmd:gap-16 xl:gap-32">
        <li>
          <NavLink
            to="/homepage"
            className="flex h-full flex-col items-center px-4 pt-3 xmd:px-10"
          >
            <FaHome className="text-3xl text-mainBlue " />
            <h3 className="text-[13px] xsm:text-sm"> Home</h3>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/friends"
            className="flex h-full flex-col items-center px-4 pt-3 xmd:px-10"
          >
            <FaUserFriends className="text-3xl text-mainBlue " />
            <h3 className="text-[13px] xsm:text-sm"> Friends</h3>
          </NavLink>
        </li>

        <li>
          <div
            className="flex h-full cursor-pointer flex-col items-center px-4 pt-3 xmd:px-10"
            onClick={() => {
              dispatch({ type: "ADD_POST" });
            }}
          >
            <MdAddCircle className="text-3xl text-mainBlue " />
            <h3 className="text-[13px] xsm:text-sm"> Post</h3>
          </div>
        </li>
      </ul>

      <div className="flex items-center gap-2">
        {user && (
          <img
            src={user.profileImg.url ? user.profileImg.url : defaultProfile}
            alt="profile"
            className="object-fit h-11 w-11 cursor-pointer rounded-full xsm:h-12 xsm:w-12"
          />
        )}

        <span className="hidden font-medium opacity-80 xsm:block ">
          {user.firstName} {user.lastName}{" "}
        </span>
        <MdKeyboardArrowDown
          className="absolute top-12 translate-x-7 cursor-pointer text-2xl hover:opacity-70 xsm:relative xsm:top-0 xsm:translate-x-0"
          onClick={() => setIsNavMenu(!isNavMenu)}
        />

        {isNavMenu && <NavMenu user={user} setIsNavMenu={setIsNavMenu} />}
      </div>
    </nav>
  );
};

export default Navbar;
