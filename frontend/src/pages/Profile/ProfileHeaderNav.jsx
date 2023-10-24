import { NavLink } from "react-router-dom";

const ProfileHeaderNav = ({ profile }) => {
  return (
    <nav>
      {profile && (
        <ul className="flex gap-3 border-t-[1px] border-zinc-200 text-lg font-medium text-zinc-700">
          <NavLink
            to={`/profile/${profile._id}/`}
            className={({ isActive }) =>
              isActive
                ? "flex items-center rounded-sm border-b-2 border-blue-700 bg-zinc-100/60 px-3.5 py-2 text-center font-semibold "
                : "px-3.5 py-2.5 hover:bg-zinc-100"
            }
          >
            <li className="py-2.5">Home</li>
          </NavLink>
          <NavLink
            to={`/profile/${profile._id}/friends`}
            className={({ isActive }) =>
              isActive
                ? "rounded-sm border-b-2 border-blue-700 bg-zinc-100/60 px-3.5 py-2.5 font-semibold "
                : "px-3.5 py-2.5 hover:bg-zinc-100"
            }
          >
            <li className="py-2.5">Friends</li>
          </NavLink>
        </ul>
      )}
    </nav>
  );
};

export default ProfileHeaderNav;
