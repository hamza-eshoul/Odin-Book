import { useState } from "react";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";
import { Link } from "react-router-dom";

// images
import defaultProfile from "../../assets/images/defaultProfile.png";

// icons
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { VscGraph } from "react-icons/vsc";
import { HiUserGroup } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

// components
import HomepageAsideCard from "./HomepageAsideCard";
import Toast from "../../components/Toast";

const aside_card_items = [
  {
    title: "Marketplace",
    icon: <SiHomeassistantcommunitystore className="text-2xl text-zinc-500" />,
  },
  {
    title: "Ads Manager",
    icon: <VscGraph className="text-2xl text-zinc-500" />,
  },
  { title: "Groups", icon: <HiUserGroup className="text-2xl text-zinc-500" /> },
];

const HomepageLeftAside = () => {
  const [toastNotification, setToastNotification] = useState(false);
  const { user } = useAuthContext();

  const toggleToastNotification = () => {
    setToastNotification(true);

    setTimeout(() => {
      setToastNotification(null);
    }, 5000);
  };

  return (
    <aside className="hidden w-[25%] flex-col items-center lg:flex ">
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
            <Link
              className="font-semibold hover:underline"
              to={`/profile/${user._id}/`}
            >
              {user.firstName} {user.lastName}{" "}
            </Link>
            <span className="text-[15px] text-zinc-500">
              @{user.occupation ? user.occupation : "No profession inserted"}
            </span>
          </div>
        </div>
      </HomepageAsideCard>

      <HomepageAsideCard>
        <ul className="space-y-2">
          <li>
            <Link
              className="flex cursor-pointer items-center gap-4 rounded p-3 hover:bg-zinc-100/60"
              to={`/profile/${user._id}/`}
            >
              <CgProfile className="text-2xl text-zinc-500" />
              <span className="text-[17px] font-light">Profile</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex cursor-pointer items-center gap-4 rounded p-3 hover:bg-zinc-100/60"
              to="/friends/"
            >
              <FaUserFriends className="text-2xl text-zinc-500 " />
              <span className="text-[17px] font-light">Friends</span>
            </Link>
          </li>

          {aside_card_items.map((item) => (
            <li
              key={item.title}
              className="flex cursor-pointer items-center gap-4 rounded p-3 hover:bg-zinc-100/60"
              onClick={toggleToastNotification}
            >
              {item.icon}

              <span className="text-[17px] font-light">{item.title}</span>
            </li>
          ))}
        </ul>
      </HomepageAsideCard>
      {toastNotification && (
        <Toast
          elementType={"Button"}
          bgColor={"bg-mainBlue"}
          textColor={"text-white"}
          toastNotification={toastNotification}
          setToastNotification={setToastNotification}
        />
      )}
    </aside>
  );
};

export default HomepageLeftAside;
