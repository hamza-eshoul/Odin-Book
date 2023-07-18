import { Outlet } from "react-router-dom";
import FriendsSideBar from "../components/FriendsSideBar";

const Friends = () => {
  return (
    <section className="min-h-screen w-full pt-16 flex">
      <FriendsSideBar />
      <Outlet />
    </section>
  );
};

export default Friends;
