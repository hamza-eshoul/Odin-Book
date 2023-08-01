import { FaUserFriends } from "react-icons/fa";
import odinBookLogo from "../images/odin-book.jpeg";
import { CgProfile } from "react-icons/cg";
import { MdAddCircle } from "react-icons/md";
import defaultProfile from "../images/defaultProfile.png";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import AddPost from "../components/AddPost";
import Overlay from "../components/Overlay";
import { useEffect, useState } from "react";
import { usePostContext } from "../hooks/usePostContext";

const Homepage = ({ isAddPostActive, setIsAddPostActive }) => {
  const [pageLoading, setPageLoading] = useState(null);
  const { user } = useAuthContext();
  const { dispatch, posts } = usePostContext();

  useEffect(() => {
    const user_id = user._id;
    const user_friends_ids = user.friends_ids;

    const user_and_friends_ids = user_friends_ids.concat(user_id);

    const fetchRecentPosts = async () => {
      dispatch({ type: "SET_POSTS", payload: [" ", " ", " ", " ", " "] });
      setPageLoading(true);
      const response = await fetch("http://localhost:4000/post/recent_posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_and_friends_ids }),
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_POSTS", payload: json });
        setPageLoading(null);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <main className="min-h-screen flex gap-6 w-[75%] mx-auto py-24">
      {isAddPostActive && (
        // Overlay
        <>
          <Overlay />
          <AddPost setIsAddPostActive={setIsAddPostActive} />
        </>
      )}

      {/* User Panel */}
      <section className="w-[25%]">
        {/* User Image */}
        {pageLoading ? (
          <div className="flex justify-center items-center bg-white h-36 rounded-t-lg">
            <div className="animate-pulse h-24 w-24 border-[1px] border-white bg-slate-200 rounded-full" />
          </div>
        ) : (
          <div className="flex justify-center items-center h-36 bg-sky-700/80 rounded-t-lg">
            <div className="h-24 w-24 border-[1px] border-white rounded-full">
              {user && (
                <img
                  src={
                    user.profileImg.url ? user.profileImg.url : defaultProfile
                  }
                  className="h-full w-full rounded-full"
                />
              )}
            </div>
          </div>
        )}

        {/* User Information */}
        <div className="flex flex-col gap-5 items-center bg-white py-6 px-4 ">
          <div className="flex flex-col gap-2 items-center">
            {pageLoading ? (
              <div className="w-40 h-3.5 animate-pulse  rounded bg-zinc-200" />
            ) : (
              <>
                {" "}
                <h3 className="text-2xl font-semibold">
                  {" "}
                  {user.firstName} {user.lastName}{" "}
                </h3>
                {user.friends_ids.length == 1 ? (
                  <p> {user.friends_ids.length} friend</p>
                ) : (
                  <p> {user.friends_ids.length} friends</p>
                )}
              </>
            )}
          </div>

          {/* User Links */}
          <div className="flex flex-col gap-4 w-full">
            {pageLoading ? (
              <>
                <div className="w-full h-3.5 animate-pulse  rounded bg-zinc-200" />{" "}
                <div className="w-full h-3.5 animate-pulse  rounded bg-zinc-200" />
              </>
            ) : (
              <>
                {" "}
                <Link to={`/profile/${user._id}/`}>
                  <button className="flex justify-center items-center gap-2 border-[1px] border-blue-300 text-blue-600 hover:bg-blue-50 transition duration-300 hover:border-blue-400 rounded py-1.5 w-full">
                    {" "}
                    <CgProfile className="text-3xl" />
                    <span className="text-xl"> View Profile </span>
                  </button>
                </Link>
                <Link to="/friends/" className="text-xl">
                  <button className="flex justify-center items-center gap-2 border-[1px] border-blue-300 text-blue-600 hover:bg-blue-50 transition duration-300 hover:border-blue-400 rounded py-1.5 w-full">
                    {" "}
                    <FaUserFriends className="text-3xl" /> Friends
                  </button>
                </Link>{" "}
              </>
            )}
          </div>
        </div>
      </section>
      {/* Posts Feed */}
      <section className="w-[40%] flex flex-col gap-3">
        {/* create a post */}
        <div
          className="flex items-center gap-4 pl-6 bg-white rounded-md py-2 hover:bg-sky-100 transition duration-300 cursor-pointer"
          onClick={() => {
            setIsAddPostActive(true);
          }}
        >
          <MdAddCircle className="text-blue-600 text-4xl" />
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold"> Create a Post</h3>
            <p className="text-lg text-slate-600 ">
              {" "}
              Share everyday moments with friends and families
            </p>
          </div>
        </div>

        {/* Posts */}
        {pageLoading ? (
          <>
            {posts.map((post) => (
              <PostCard key={post._id} isPostLoading={true} />
            ))}{" "}
          </>
        ) : (
          <>
            {" "}
            {posts &&
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  author={post.author}
                  content={post.content}
                  date={post.createdAt}
                  post_id={post._id}
                />
              ))}{" "}
          </>
        )}
      </section>
      {/* Complementary Information */}
      <section className="w-[30%] border-[1px] border-zinc-300 rounded-md flex flex-col items-center py-4 h-52 ">
        <div className="h-28 w-28">
          <img src={odinBookLogo} className="h-full w-full rounded-full" />
        </div>
        <p className="text-3xl text-blue-600 font-bold">Odin Book</p>
        <p className="text-xl text-zinc-700"> © Hamza Eshoul 2023 </p>
      </section>
    </main>
  );
};

export default Homepage;
