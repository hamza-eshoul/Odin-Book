import { NavLink } from "react-router-dom";

// icons
import { IoIosArrowForward } from "react-icons/io";
import { BsFillSendFill, BsFillPersonLinesFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";

const sidebar_items = [
  {
    title: "Home",
    path: "/friends",
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
    <aside className="fixed bottom-0 w-full border-r-[1.5px] border-zinc-200 bg-white p-3 shadow-lg lg:static lg:w-[25%]">
      <h2 className="hidden p-3 text-2xl font-semibold lg:block"> Friends </h2>

      <ul className="flex lg:flex-col lg:space-y-3 ">
        {sidebar_items.map((item) => (
          <li className="w-1/3 cursor-pointer lg:w-full" key={item.title}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "is-active group flex w-full items-center justify-center rounded-lg bg-zinc-100 p-1 text-lg md:justify-between md:px-2 md:py-2.5"
                  : "flex w-full items-center justify-center rounded-lg p-1 text-lg hover:bg-zinc-100 md:justify-between md:px-2 md:py-2.5"
              }
              end
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-full bg-zinc-200 p-1.5 group-[.is-active]:bg-blue-500 group-[.is-active]:text-white">
                  {item.icon}
                </div>
                <span className="hidden text-[17px] md:block">
                  {" "}
                  {item.title}
                </span>
              </div>
              <IoIosArrowForward className="hidden text-2xl text-zinc-500 md:block" />
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default FriendsSideBar;
