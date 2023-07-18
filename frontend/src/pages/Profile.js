import { useState } from "react";
import odinBookLogo from "../images/odin-book.jpeg";
import { MdMode } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import PostCard from "../components/PostCard";

const Profile = () => {
  const [coverPhoto, setCoverPhoto] = useState("");

  return (
    <section className="pt-16 pb-20">
      {/* Header Section */}
      <section className="bg-white h-[650px] border-b-[1px] border-zinc-200 shadow-sm">
        <div className="w-2/3 mx-auto relative">
          {/* Cover Photo */}
          <div className="h-[500px]">
            {coverPhoto ? (
              <img
                src={odinBookLogo}
                className="h-full w-full object-fit rounded-b-lg"
              />
            ) : (
              <div className="h-full w-full bg-zinc-300/50 rounded-b-lg"></div>
            )}
          </div>

          {/* Profile Header */}
          <header className="flex flex-col gap-6 absolute -bottom-[145px] left-10 w-[95%]">
            {/* profile image and name */}
            <div className="flex gap-2 items-end">
              {/* img */}
              <div className="h-44 w-44">
                <img
                  src={odinBookLogo}
                  alt="profile image"
                  className="h-full w-full rounded-full p-1.5 bg-white"
                />
              </div>

              {/* profile name */}
              <div className="flex w-[85%] items-center justify-between">
                <h2 className="text-3xl font-semibold"> Hamza Skynter</h2>
                <button className="flex gap-2 items-center font-semibold text-lg bg-zinc-300/50 hover:bg-zinc-300/80 rounded-md px-4 py-1.5">
                  <MdMode className="text-xl" />
                  <span className="pt-0.5">Edit Profile</span>
                </button>
              </div>
            </div>
            {/* profile tabs */}
            <ul className="flex gap-3 font-medium text-zinc-700 text-lg pt-2.5 border-t-[1px] border-zinc-200">
              <li className="py-2.5 hover:bg-zinc-100/90 rounded">
                <NavLink to="/profile" className="rounded-t px-2.5 pb-4">
                  Home
                </NavLink>
              </li>
              <li className="py-2.5 hover:bg-zinc-100/90 rounded">
                <NavLink to="/" className="rounded-t px-2.5 pb-4">
                  Friends
                </NavLink>
              </li>
            </ul>
          </header>
        </div>
      </section>

      {/* Main Section */}
      <main className="w-[65%] mx-auto flex gap-8">
        {/* User Complementary Info */}
        <div className="flex flex-col gap-4 w-1/3 mt-6">
          {/* About User*/}
          <div className="bg-white rounded-md px-6 py-7 space-y-3 shadow-sm">
            <h3 className="text-3xl font-bold"> About </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MdMode className="text-blue-600" />
                <span className="font-bold"> Pizza Delivery Boy</span>
              </li>
              <li className="flex items-center gap-2">
                <MdMode className="text-blue-600" />
                <span className="font-bold"> Pizza Delivery Boy</span>
              </li>
              <li className="flex items-center gap-2">
                <MdMode className="text-blue-600" />
                <span className="font-bold"> Pizza Delivery Boy</span>
              </li>
              <li className="flex items-center gap-2">
                <MdMode className="text-blue-600" />
                <span className="font-bold"> Pizza Delivery Boy</span>
              </li>
            </ul>
          </div>

          {/* User's Friends */}
          <div className="bg-white rounded-md px-6 py-7 space-y-3 shadow-sm">
            <div className="flex justify-between">
              <h3 className="text-3xl font-bold"> Friends </h3>
              <button className="text-zinc-600 font-medium">
                {" "}
                See All Friends
              </button>
            </div>
            <h3> No friends yet ...</h3>
          </div>
        </div>

        {/* User Posts */}
        <div className="flex flex-col gap-4 w-2/3 mt-6">
          {/* Posts Header*/}
          <div className="bg-white rounded-lg px-6 py-3 space-y-3 shadow-sm">
            <h3 className="text-3xl font-bold"> Posts </h3>
          </div>

          {/* Create Post */}
          <div className="flex items-center gap-4 pl-6 bg-white rounded-md py-2 hover:bg-sky-100 transition duration-300 cursor-pointer">
            <MdAddCircle className="text-blue-600 text-4xl" />
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold"> Create a Post</h3>
              <p className="text-lg text-slate-600 ">
                {" "}
                Share everyday moments with friends and families
              </p>
            </div>
          </div>

          {/* Post Cards */}
          {/* <PostCard />
          <PostCard />
          <PostCard />
          <PostCard /> */}
        </div>
      </main>
    </section>
  );
};

export default Profile;
