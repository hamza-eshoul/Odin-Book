import { FaUserFriends } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { BsFillSendFill, BsFillPersonLinesFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const FriendsSideBar = () => {
  return (
    <aside className="w-1/5 border-r-[1.5px] border-zinc-200 bg-white p-3 shadow-lg">
      {/* Header */}
      <h1 className="p-3 text-2xl font-semibold"> Friends </h1>
      {/* Sidebar List */}
      <ul className="space-y-3">
        <NavLink
          to="/friends/"
          className={({ isActive }) =>
            isActive
              ? "group flex w-full cursor-pointer items-center justify-between rounded-lg bg-zinc-100 px-2 py-2.5 text-lg"
              : "flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-2.5 text-lg hover:bg-zinc-100"
          }
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-full bg-zinc-200 p-1.5 group-focus:bg-blue-500 group-focus:text-white">
              <FaUserFriends className="text-xl" />
            </div>
            <span className="text-[17px]"> Home</span>
          </div>
          <IoIosArrowForward className="text-2xl text-zinc-500" />
        </NavLink>

        <NavLink
          to="/friends/requests"
          className={({ isActive }) =>
            isActive
              ? "group flex w-full cursor-pointer items-center justify-between rounded-lg bg-zinc-100 px-2 py-2.5 text-lg"
              : "flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-2.5 text-lg hover:bg-zinc-100"
          }
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-full bg-zinc-200 p-1.5 group-focus:bg-blue-500 group-focus:text-white">
              <BsFillSendFill className="text-xl" />
            </div>
            <span className="text-[17px]"> Friend Requests</span>
          </div>
          <IoIosArrowForward className="text-2xl text-zinc-500" />
        </NavLink>

        <NavLink
          to="/friends/list"
          className={({ isActive }) =>
            isActive
              ? "group flex w-full cursor-pointer items-center justify-between rounded-lg bg-zinc-100 px-2 py-2.5 text-lg"
              : "flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-2.5 text-lg hover:bg-zinc-100"
          }
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-full bg-zinc-200 p-1.5 group-focus:bg-blue-500 group-focus:text-white">
              <BsFillPersonLinesFill className="text-xl" />
            </div>
            <span className="text-[17px]"> All Friends </span>
          </div>
          <IoIosArrowForward className="text-2xl text-zinc-500" />
        </NavLink>
      </ul>
    </aside>
  );
};

export default FriendsSideBar;
