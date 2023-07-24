import { FaUserFriends } from "react-icons/fa";
import odinBookLogo from "../images/odin-book.jpeg";
import { CgProfile } from "react-icons/cg";
import { MdAddCircle } from "react-icons/md";

import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import AddPost from "../components/AddPost";
import Overlay from "../components/Overlay";
import { useEffect } from "react";
import { usePostContext } from "../hooks/usePostContext";

const Homepage = ({ isAddPostActive, setIsAddPostActive }) => {
  const { user } = useAuthContext();
  const { dispatch, posts } = usePostContext();

  useEffect(() => {
    const fetchRecentPosts = async () => {
      const response = await fetch("http://localhost:4000/post/recent_posts");

      const json = await response.json();

      dispatch({ type: "SET_POSTS", payload: json });
    };

    fetchRecentPosts();
  }, []);

  return (
    <main className="min-h-screen flex gap-6 w-[75%] mx-auto relative py-24">
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
        <div className="flex justify-center items-center h-36 bg-sky-700/80">
          <div className="h-24 w-24">
            <img src={odinBookLogo} className="h-full w-full rounded-full" />
          </div>
        </div>

        {/* User Information */}
        <div className="flex flex-col gap-5 items-center bg-white py-6 px-4 ">
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-2xl font-semibold">
              {" "}
              {user.firstName} {user.lastName}{" "}
            </h3>
            <p> 0 friends</p>
          </div>

          {/* User Links */}
          <div className="flex flex-col gap-4 w-full">
            <Link to={`/profile/${user._id}`}>
              <button className="flex justify-center items-center gap-2 border-[1px] border-blue-300 text-blue-600 hover:bg-blue-50 transition duration-300 hover:border-blue-400 rounded py-1.5 w-full">
                {" "}
                <CgProfile className="text-3xl" />
                <span className="text-xl"> View Profile </span>
              </button>
            </Link>
            <button className="flex justify-center items-center gap-2 border-[1px] border-blue-300 text-blue-600 hover:bg-blue-50 transition duration-300 hover:border-blue-400 rounded py-1.5">
              {" "}
              <FaUserFriends className="text-3xl" />
              <span className="text-xl">Friends </span>
            </button>
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
        {posts &&
          posts.map((post) => (
            <PostCard
              key={post._id}
              author={post.author}
              content={post.content}
              likes={post.usersLikes}
              date={post.createdAt}
              post_id={post._id}
            />
          ))}
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
