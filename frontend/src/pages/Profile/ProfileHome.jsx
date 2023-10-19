import { MdAddCircle } from "react-icons/md";
import AboutProfile from "./AboutProfile";
import FriendSmallCard from "../../components/FriendSmallCard";
import { useEffect, useState } from "react";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import PostCard from "../../components/PostCard";
import Overlay from "../../components/Overlay";
import AddPost from "../../components/AddPost";
import { usePostContext } from "../../hooks/usePostContext";
import EditProfile from "../../components/EditProfile";
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
        },
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
          `http://localhost:4000/post/user_posts/${currentUser_id}`,
        );

        const json = await response.json();

        dispatch({ type: "SET_POSTS", payload: json });
      };

      fetchUserPosts();
    }
  }, [currentUser, dispatch]);

  return (
    <main className="mx-auto flex w-[65%] gap-8">
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
      <div className="mt-6 flex w-1/3 flex-col gap-4">
        {/* About User*/}
        <div className="space-y-3 rounded-md border-[1px] border-zinc-200 bg-white px-6 pb-4 pt-2.5 shadow-sm">
          <h3 className="text-2xl font-semibold"> About </h3>
          <AboutProfile currentUser={currentUser} />
        </div>

        {/* User's Friends */}
        <div className="space-y-3 rounded-md border-[1px] border-zinc-200 bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold"> Friends </h3>
            <Link className="text-zinc-600" to={`${location.pathname}friends`}>
              See all friends
            </Link>
          </div>

          {friendsLoading ? (
            <div className="flex items-center justify-center">
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
      <div className="mt-6 flex w-2/3 flex-col gap-4">
        {/* Posts Header*/}
        <div className="rounded-md border-[1px] border-zinc-200 bg-white px-6 py-2.5 shadow-sm">
          <h3 className="text-2xl font-semibold"> Posts </h3>
        </div>
        {/* Create Post */}
        {location.pathname.split("/")[2] ===
        JSON.parse(localStorage.getItem("user"))._id ? (
          <div
            className="flex cursor-pointer items-center gap-4 rounded-md border-[1px] border-zinc-200 bg-white py-3 pl-6 transition duration-300 hover:bg-[#f8fafd]"
            onClick={() => {
              setIsAddPostActive(true);
            }}
          >
            <MdAddCircle className="text-3xl text-blue-600" />
            <div className="flex flex-col">
              <h3 className="text-lg font-medium"> Create a Post</h3>
              <p className="font-light text-zinc-600 ">
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
          <div className="flex justify-center gap-4 rounded-md bg-white p-4  ">
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
              image={userPost.postImage.url ?? null}
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
