import { NavLink } from "react-router-dom";

const ProfileHeaderNav = ({ profile }) => {
  return (
    <>
      {profile && (
        <div className="flex justify-center gap-3 border-t-[1px] border-zinc-200 font-medium text-zinc-700 xmd:justify-normal xmd:text-lg">
          <NavLink
            to={`/profile/${profile._id}/`}
            className={({ isActive }) =>
              isActive
                ? "flex items-center rounded-sm border-b-2 border-blue-700 bg-zinc-100/60 px-3.5 py-1.5 text-center font-semibold xmd:py-2 "
                : "px-3.5 py-1.5 hover:bg-zinc-100 xmd:py-2.5"
            }
          >
            <div className="py-1.5 xmd:py-2.5">Home</div>
          </NavLink>
          <NavLink
            to={`/profile/${profile._id}/friends`}
            className={({ isActive }) =>
              isActive
                ? "rounded-sm border-b-2 border-blue-700 bg-zinc-100/60 px-3.5 py-1.5 font-semibold xmd:py-2.5 "
                : "px-3.5 py-1.5 hover:bg-zinc-100 xmd:py-2.5"
            }
          >
            <div className="py-1.5 xmd:py-2.5">Friends</div>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default ProfileHeaderNav;
