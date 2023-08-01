import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import defaultProfile from "../images/defaultProfile.png";
import { MdMode } from "react-icons/md";
import { useAuthContext } from "../hooks/useAuthContext";
import { TbFriendsOff } from "react-icons/tb";
import { FadeLoader, MoonLoader } from "react-spinners";
import { BsFillCameraFill, BsCamera2 } from "react-icons/bs";
import Overlay from "../components/Overlay";
import EditProfilePhoto from "../components/EditProfilePhoto";
import EditCoverPhoto from "../components/EditCoverPhoto";

const Profile = () => {
  const [isFriendRequestLoading, setIsFriendRequestLoading] = useState(false);
  const [updateProfilePictures, setUpdateProfilePictures] = useState(null);
  const [isRequestSent, setIsRequestSent] = useState(null);
  const [isUnFriendLoading, setIsUnFriendLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [profileFunctionality, setProfileFunctionality] = useState("edit");
  const [isEditProfileActive, setIsEditProfileActive] = useState(false);
  const { user, dispatch } = useAuthContext();
  const [homeLink, setHomeLink] = useState("");
  const [friendsLink, setFriendsLink] = useState("");
  const [isUpdateProfilePhotoActive, setIsUpdateProfilePhotoActive] =
    useState(false);
  const [isUpdateCoverPhotoActive, setIsUpdateCoverPhotoActive] =
    useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(null);

  const location = useLocation();

  const addFriend = async () => {
    setIsFriendRequestLoading(true);
    const user_id = user._id;
    const friend_id = currentUser._id;

    const response = await fetch("http://localhost:4000/user/add_friend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, friend_id }),
    });

    const json = await response.json();

    if (response.ok) {
      setIsFriendRequestLoading(false);
      setIsRequestSent(true);
      dispatch({ type: "UPDATE_USER", payload: json });
    }
  };

  const removeFriend = async () => {
    setIsUnFriendLoading(true);

    const user_id = user._id;
    const user_friends_ids = user.friends_ids;
    const friend_id = currentUser._id;
    const friend_friends_ids = currentUser.friends_ids;

    const response = await fetch("http://localhost:4000/user/unfriend", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        friend_id,
        user_friends_ids,
        friend_friends_ids,
      }),
    });

    const json = await response.json();

    if (response.ok) {
      setIsUnFriendLoading(false);
      dispatch({ type: "UPDATE_USER", payload: json });
    }
  };

  useEffect(() => {
    if (user && user._id == location.pathname.split("/")[2]) {
      setProfileFunctionality("edit");
      setUpdateProfilePictures(true);
    } else if (currentUser && user.friends_ids.includes(currentUser._id)) {
      setProfileFunctionality("unfriend");
    } else if (
      currentUser &&
      user.sent_friends_requests.includes(currentUser._id)
    ) {
      setProfileFunctionality("friend_request");
    } else {
      setProfileFunctionality("add_friend");
    }
  }, [user, currentUser]);

  useEffect(() => {
    setIsProfileLoading(true);
    const friendLink = location.pathname + "friends";

    setHomeLink(location.pathname);
    setFriendsLink(friendLink);

    const userId = location.pathname.split("/")[2];

    const fetchUserProfile = async () => {
      const response = await fetch(`http://localhost:4000/user/${userId}`);

      const json = await response.json();

      if (response.ok) {
        setCurrentUser(json);
        setIsProfileLoading(null);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      {isProfileLoading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <FadeLoader
            color={"#2463eb"}
            loading={true}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <section className="min-h-screen pt-16 pb-20">
          {isUpdateProfilePhotoActive && (
            <>
              <Overlay />
              <EditProfilePhoto
                setIsUpdateProfilePhotoActive={setIsUpdateProfilePhotoActive}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            </>
          )}

          {isUpdateCoverPhotoActive && (
            <>
              <Overlay />
              <EditCoverPhoto
                setIsUpdateCoverPhotoActive={setIsUpdateCoverPhotoActive}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            </>
          )}
          {/* Header Section */}
          <section className="bg-white h-[645px] border-b-[1px] border-zinc-200 shadow-sm">
            <div className="w-2/3 mx-auto relative">
              {/* Cover Photo */}
              <div className="h-[500px] relative">
                {updateProfilePictures && (
                  <div
                    className="flex z-10 absolute bottom-4 right-4 gap-2 items-center rounded-lg  px-3 py-2 cursor-pointer bg-[#797a7b] hover:bg-zinc-500 text-white font-medium"
                    onClick={() => setIsUpdateCoverPhotoActive(true)}
                  >
                    <BsCamera2 />
                    <button>Add cover photo</button>
                  </div>
                )}

                {currentUser && currentUser.coverImg.url ? (
                  <img
                    src={currentUser.coverImg.url}
                    className="h-full w-full object-fit rounded-b-lg"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-b from-zinc-100 from-70% to-zinc-400 rounded-b-lg" />
                )}
              </div>

              {/* Profile Header */}
              <header className="flex flex-col gap-6 absolute -bottom-[145px] left-10 w-[95%]">
                {/* profile image and name */}
                <div className="flex gap-2 items-end">
                  {/* img */}
                  <div className="h-44 w-44 relative">
                    {currentUser && currentUser.profileImg.url ? (
                      <img
                        src={currentUser.profileImg.url}
                        alt="profile image"
                        className="h-full w-full rounded-full p-1.5 bg-white"
                      />
                    ) : (
                      <img
                        src={defaultProfile}
                        alt="profile image"
                        className="h-full w-full rounded-full p-1.5 bg-white"
                      />
                    )}

                    {/* Update Photo */}
                    {updateProfilePictures && (
                      <div
                        className="absolute right-1 top-[130px] rounded-full bg-zinc-100 hover:bg-zinc-200 w-10 h-10 flex justify-center items-center cursor-pointer"
                        onClick={() => {
                          setIsUpdateProfilePhotoActive(
                            !isUpdateProfilePhotoActive
                          );
                        }}
                      >
                        <BsFillCameraFill className="text-2xl" />
                      </div>
                    )}
                  </div>

                  {/* profile name */}
                  <div className="flex w-[85%] items-center justify-between">
                    {currentUser && (
                      <h2 className="text-3xl font-semibold">
                        {" "}
                        {currentUser.firstName} {currentUser.lastName}{" "}
                      </h2>
                    )}

                    {profileFunctionality == "edit" && (
                      <button
                        className="flex gap-2 items-center font-semibold text-lg bg-zinc-300/50 hover:bg-zinc-300/80 rounded-md px-4 py-1.5"
                        onClick={() => {
                          setIsEditProfileActive(true);
                        }}
                      >
                        <MdMode className="text-xl" />
                        <span className="pt-0.5">Edit Profile</span>
                      </button>
                    )}

                    {profileFunctionality == "unfriend" && (
                      <button
                        className="flex gap-2 items-center justify-center font-semibold text-lg bg-blue-600 hover:bg-blue-500 rounded-md px-4 py-1.5 text-white"
                        onClick={() => {
                          removeFriend();
                        }}
                      >
                        {isUnFriendLoading ? (
                          <MoonLoader
                            color={"white"}
                            loading={isUnFriendLoading}
                            size={25}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : (
                          <>
                            {" "}
                            <TbFriendsOff className="text-xl" />
                            <span className="pt-0.5">Unfriend</span>{" "}
                          </>
                        )}
                      </button>
                    )}

                    {profileFunctionality == "add_friend" && (
                      <button
                        className="flex gap-2 items-center justify-center font-semibold text-lg bg-blue-600 hover:bg-blue-500 rounded-md px-4 py-1.5 text-white"
                        onClick={() => {
                          addFriend();
                        }}
                      >
                        {isFriendRequestLoading ? (
                          <MoonLoader
                            color={"white"}
                            loading={isFriendRequestLoading}
                            size={25}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                            className="mx-3"
                          />
                        ) : (
                          <>
                            {isRequestSent ? (
                              <>
                                {" "}
                                <TbFriendsOff className="text-xl" />
                                <span className="pt-0.5">
                                  Request sent!
                                </span>{" "}
                              </>
                            ) : (
                              <>
                                <TbFriendsOff className="text-xl" />
                                <span className="pt-0.5">Add Friend</span>{" "}
                              </>
                            )}
                          </>
                        )}
                      </button>
                    )}

                    {profileFunctionality == "friend_request" && (
                      <button className="bg-zinc-200 text-zinc-400 pointer-events-none rounded-md px-4 py-1.5 ">
                        <span className="pt-0.5">Friend Request Sent!</span>
                      </button>
                    )}
                  </div>
                </div>
                {/* profile tabs */}
                <ul className="flex gap-3 font-medium text-zinc-700 text-lg border-t-[1px] border-zinc-200">
                  <NavLink
                    to={homeLink}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-zinc-100/60 py-2 px-3.5 text-center border-b-2 font-semibold border-blue-700 rounded-sm flex items-center "
                        : "hover:bg-zinc-100 py-2.5 px-3.5"
                    }
                  >
                    <li className="py-2.5">Home</li>
                  </NavLink>
                  <NavLink
                    to={friendsLink}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-zinc-100/60 py-2.5 px-3.5 border-b-2 font-semibold border-blue-700 rounded-sm "
                        : "hover:bg-zinc-100 py-2.5 px-3.5"
                    }
                  >
                    <li className="py-2.5">Friends</li>
                  </NavLink>
                </ul>
              </header>
            </div>
          </section>

          <Outlet
            context={{
              currentUser,
              isEditProfileActive,
              setIsEditProfileActive,
            }}
          />
        </section>
      )}
    </>
  );
};

export default Profile;
