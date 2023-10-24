import formatDate from "../../utility/formatDate";

// icons
import { BsFillClockFill, BsFillBriefcaseFill } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa";
import { ImHome } from "react-icons/im";

const ProfileAbout = ({ profile }) => {
  return (
    <div className="space-y-3 rounded-md border-[1px] border-zinc-200 bg-white px-6 pb-4 pt-2.5 shadow-sm">
      <h3 className="text-2xl font-semibold"> About </h3>

      <ul className="space-y-3.5">
        <li className="flex items-center gap-3">
          <BsFillBriefcaseFill className="text-lg text-zinc-400" />
          <span className="text-[15px] font-semibold">
            {" "}
            {profile.occupation}
          </span>
        </li>
        <li className="flex items-center gap-3">
          <FaUserGraduate className="text-lg text-zinc-400" />
          <div>
            Studied at{" "}
            <span className="text-[15px] font-semibold">
              {profile.education}
            </span>
          </div>
        </li>
        <li className="flex items-center gap-3">
          <ImHome className="text-lg text-zinc-400" />
          <div>
            Lives in{" "}
            <span className="text-[15px] font-semibold">
              {profile.location}
            </span>
          </div>
        </li>
        <li className="flex items-center gap-3">
          <BsFillClockFill className="text-lg text-zinc-400" />

          <div>
            Member since{" "}
            <span className="text-[15px] font-semibold">
              {formatDate(profile.createdAt)}
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ProfileAbout;
