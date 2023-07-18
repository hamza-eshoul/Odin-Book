import { FaUserFriends } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { BsFillSendFill, BsFillPersonLinesFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const FriendsSideBar = () => {
  return (
    <aside className="bg-white w-1/5 shadow-lg p-3">
      {/* Header */}
      <h1 className="text-3xl font-semibold pb-3"> Friends </h1>
      {/* Sidebar List */}
      <ul className="space-y-3">
        <NavLink
          to="/friends/"
          className={({ isActive }) =>
            isActive
              ? "flex justify-between items-center text-lg w-full bg-zinc-100 rounded-lg px-2 py-2.5 cursor-pointer group"
              : "flex justify-between items-center text-lg w-full hover:bg-zinc-100 rounded-lg px-2 py-2.5 cursor-pointer"
          }
        >
          <div className="flex gap-3 items-center">
            <div className="bg-zinc-200 flex justify-center items-center p-1.5 rounded-full group-focus:text-white group-focus:bg-blue-500">
              <FaUserFriends className="text-xl" />
            </div>
            Home
          </div>
          <IoIosArrowForward className="text-2xl" />
        </NavLink>

        <NavLink
          to="/friends/requests"
          className={({ isActive }) =>
            isActive
              ? "flex justify-between items-center text-lg w-full bg-zinc-100 rounded-lg px-2 py-2.5 cursor-pointer group"
              : "flex justify-between items-center text-lg w-full hover:bg-zinc-100 rounded-lg px-2 py-2.5 cursor-pointer"
          }
        >
          <div className="flex gap-3 items-center">
            <div className="bg-zinc-200 flex justify-center items-center p-1.5 rounded-full group-focus:text-white group-focus:bg-blue-500">
              <BsFillSendFill className="text-xl" />
            </div>
            Friend Requests
          </div>
          <IoIosArrowForward className="text-2xl" />
        </NavLink>

        <NavLink
          to="/friends/list"
          className={({ isActive }) =>
            isActive
              ? "flex justify-between items-center text-lg w-full bg-zinc-100 rounded-lg px-2 py-2.5 cursor-pointer group"
              : "flex justify-between items-center text-lg w-full hover:bg-zinc-100 rounded-lg px-2 py-2.5 cursor-pointer"
          }
        >
          <div className="flex gap-3 items-center">
            <div className="bg-zinc-200 flex justify-center items-center p-1.5 rounded-full group-focus:text-white group-focus:bg-blue-500">
              <BsFillPersonLinesFill className="text-xl" />
            </div>
            All Friends
          </div>
          <IoIosArrowForward className="text-2xl" />
        </NavLink>
      </ul>
    </aside>
  );
};

export default FriendsSideBar;
