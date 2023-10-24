import { Outlet } from "react-router-dom";

// components
import FriendsSideBar from "./FriendsSideBar";

const Friends = () => {
  return (
    <section className="flex min-h-screen w-full pt-16">
      <FriendsSideBar />
      <Outlet />
    </section>
  );
};

export default Friends;
