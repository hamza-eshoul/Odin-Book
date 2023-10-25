import { Outlet } from "react-router-dom";

// components
import FriendsSideBar from "./FriendsSideBar";

const Friends = () => {
  return (
    <main className="flex min-h-screen w-full pt-16">
      <FriendsSideBar />
      <Outlet />
    </main>
  );
};

export default Friends;
