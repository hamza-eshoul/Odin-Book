import { NavLink } from "react-router-dom";

// icons
import { IoIosArrowForward } from "react-icons/io";
import { BsFillSendFill, BsFillPersonLinesFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";

const sidebar_items = [
  {
    title: "Home",
    path: "/friends/",
    icon: <FaUserFriends className="text-xl" />,
  },
  {
    title: "Friends Requests",
    path: "/friends/requests",
    icon: <BsFillSendFill className="text-xl" />,
  },
  {
    title: "All Friends",
    path: "/friends/list",
    icon: <BsFillPersonLinesFill className="text-xl" />,
  },
];

const FriendsSideBar = () => {
  return (
    <aside className="w-1/5 border-r-[1.5px] border-zinc-200 bg-white p-3 shadow-lg">
      <h1 className="p-3 text-2xl font-semibold"> Friends </h1>

      <ul className="space-y-3">
        {sidebar_items.map((item) => (
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "is-active group flex w-full cursor-pointer items-center justify-between rounded-lg bg-zinc-100 px-2 py-2.5 text-lg"
                : "flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-2.5 text-lg hover:bg-zinc-100"
            }
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-full bg-zinc-200 p-1.5 group-[.is-active]:bg-blue-500 group-[.is-active]:text-white">
                {item.icon}
              </div>
              <span className="text-[17px]"> {item.title}</span>
            </div>
            <IoIosArrowForward className="text-2xl text-zinc-500" />
          </NavLink>
        ))}
      </ul>
    </aside>
  );
};

export default FriendsSideBar;
