import defaultProfile from "../../assets/images/defaultProfile.png";
import { FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import HomepageAsideCard from "./HomepageAsideCard";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { VscGraph } from "react-icons/vsc";
import { HiUserGroup } from "react-icons/hi";

const aside_card_items = [
  { title: "Profile", icon: <CgProfile /> },
  { title: "Friends", icon: <FaUserFriends /> },
  { title: "Marketplace", icon: <SiHomeassistantcommunitystore /> },
  { title: "Ads Manager", icon: <VscGraph /> },
  { title: "Groups", icon: <HiUserGroup /> },
];

const HomepageLeftAside = () => {
  const { user } = useAuthContext();

  return (
    <section className="flex w-[25%] flex-col items-center">
      <HomepageAsideCard>
        <div className="flex cursor-pointer gap-3 rounded p-2 hover:bg-zinc-100/50">
          <div className="relative h-12 w-12 ">
            <img
              src={user.profileImg.url ? user.profileImg.url : defaultProfile}
              className="h-full w-full rounded-full"
            />
            <div className="absolute bottom-[-2px] right-1 rounded-full border-[1px]">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold">
              {user.firstName} {user.lastName}{" "}
            </span>
            <span className="text-[15px] text-zinc-500">
              @{user.occupation ? user.occupation : "No profession inserted"}
            </span>
          </div>
        </div>
      </HomepageAsideCard>
      <HomepageAsideCard>
        <ul className="space-y-2">
          {aside_card_items.map((item) => (
            <li
              key={item.title}
              className="flex cursor-pointer items-center gap-4 rounded p-3 hover:bg-zinc-100/60"
            >
              <div className="text-2xl text-zinc-500">{item.icon}</div>

              <span className="text-[17px] font-light">{item.title}</span>
            </li>
          ))}
        </ul>
      </HomepageAsideCard>
    </section>
  );
};

export default HomepageLeftAside;
