import { MdAddCircle } from "react-icons/md";
import AboutProfile from "../components/AboutProfile";
import FriendSmallCard from "../components/FriendSmallCard";
import { useEffect, useState } from "react";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import PostCard from "./PostCard";
import Overlay from "./Overlay";
import AddPost from "./AddPost";
import { usePostContext } from "../hooks/usePostContext";
import EditProfile from "./EditProfile";
import { MoonLoader } from "react-spinners";

const ProfileHome = ({ isAddPostActive, setIsAddPostActive }) => {
  const [friends, setFriends] = useState([]);
  const [friendsLoading, setFriendsLoading] = useState(null);
  const { currentUser, isEditProfileActive, setIsEditProfileActive } =
    useOutletContext();
  const { posts, dispatch } = usePostContext();
  const location = useLocation();

  useEffect(() => {
    const fetchUserFriends = async () => {
      setFriendsLoading(true);
      const userFriends_ids = currentUser.friends_ids;

      const response = await fetch(
        "http://localhost:4000/user/limited_friends",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userFriends_ids }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        setFriends(json);
        setFriendsLoading(null);
      }
    };

    if (currentUser) {
      fetchUserFriends();
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const currentUser_id = currentUser._id;

      const fetchUserPosts = async () => {
        const response = await fetch(
          `http://localhost:4000/post/user_posts/${currentUser_id}`
        );

        const json = await response.json();

        dispatch({ type: "SET_POSTS", payload: json });
      };

      fetchUserPosts();
    }
  }, [currentUser, dispatch]);

  return (
    <main className="w-[65%] mx-auto flex gap-8">
      {isAddPostActive && (
        <>
          <Overlay />
          <AddPost setIsAddPostActive={setIsAddPostActive} />
        </>
      )}

      {isEditProfileActive && (
        <>
          <Overlay />
          <EditProfile setIsEditProfileActive={setIsEditProfileActive} />
        </>
      )}

      {/* User Complementary Info */}
      <div className="flex flex-col gap-4 w-1/3 mt-6">
        {/* About User*/}
        <div className="bg-white rounded-md px-6 py-7 space-y-3 shadow-sm">
          <h3 className="text-3xl font-bold"> About </h3>
          <AboutProfile currentUser={currentUser} />
        </div>

        {/* User's Friends */}
        <div className="bg-white rounded-md px-6 py-7 space-y-3 shadow-sm">
          <div className="flex justify-between">
            <h3 className="text-3xl font-bold"> Friends </h3>
            <Link
              className="text-zinc-600 font-medium"
              to={`${location.pathname}friends`}
            >
              See All Friends
            </Link>
          </div>

          {friendsLoading ? (
            <div className="flex justify-center items-center">
              <MoonLoader
                color={"#3c82f6"}
                loading={friendsLoading}
                size={40}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <>
              {" "}
              {friends.length !== 0 ? (
                <div className="flex flex-wrap gap-3">
                  {friends.map((friend) => (
                    <FriendSmallCard
                      key={friend._id}
                      firstName={friend.firstName}
                      lastName={friend.lastName}
                      profileImg={friend.profileImg.url}
                      friend_id={friend._id}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  <h1 className="text-lg"> {friends.length} friends </h1>
                  {friends.map((friend) => (
                    <div>{friend}</div>
                  ))}
                </div>
              )}{" "}
            </>
          )}
        </div>
      </div>

      {/* User Posts */}
      <div className="flex flex-col gap-4 w-2/3 mt-6">
        {/* Posts Header*/}
        <div className="bg-white rounded-lg px-6 py-3 space-y-3 shadow-sm">
          <h3 className="text-3xl font-bold"> Posts </h3>
        </div>
        {/* Create Post */}
        {location.pathname.split("/")[2] ===
        JSON.parse(localStorage.getItem("user"))._id ? (
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
        ) : (
          ""
        )}

        {/* Posts */}
        {posts === null || posts.length === 0 ? (
          <div className="flex justify-center gap-4 p-4 bg-white rounded-md  ">
            <h3 className="text-xl font-medium ">
              {" "}
              There currently are not posts ...
            </h3>
          </div>
        ) : (
          posts.map((userPost) => (
            <PostCard
              key={userPost._id}
              author={userPost.author}
              content={userPost.content}
              date={userPost.createdAt}
              post_id={userPost._id}
            />
          ))
        )}
      </div>
    </main>
  );
};

export default ProfileHome;
