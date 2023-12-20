import { useState } from "react";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";

// icons
import { MdMode } from "react-icons/md";

// images
import ProfileHeaderNav from "./ProfileHeaderNav";
import ProfileHeaderProfileImage from "./ProfileHeaderProfileImage";
import Overlay from "../../components/Overlay";
import UpdateProfileData from "../../components/UpdateProfileData";
import ProfileHeaderFriendButton from "./ProfileHeaderFriendButton";

const ProfileHeaderData = ({ profile, setProfile }) => {
  const [isUpdateProfileData, setIsUpdateProfileData] = useState(false);
  const { user } = useAuthContext();

  return (
    <>
      {isUpdateProfileData && (
        <>
          <Overlay />
          <UpdateProfileData
            profile={profile}
            setProfile={setProfile}
            setIsUpdateProfileData={setIsUpdateProfileData}
          />
        </>
      )}

      <section className="absolute -bottom-[244px] flex w-full flex-col gap-6 xmd:-bottom-[145px] xmd:left-10 xmd:w-[95%]">
        <div className="flex flex-col items-center gap-2 xmd:flex-row xmd:items-end">
          <ProfileHeaderProfileImage
            profile={profile}
            setProfile={setProfile}
          />

          <div className="flex w-[85%] flex-col items-center justify-between gap-4 xmd:flex-row xmd:gap-0">
            {profile && (
              <span className="text-2xl font-semibold xmd:text-3xl">
                {" "}
                {profile.firstName} {profile.lastName}{" "}
              </span>
            )}

            {user &&
              profile &&
              user._id == profile._id &&
              profile.firstName + profile.lastName !== "HamzaEshoul" && (
                <button
                  className="flex items-center gap-2 rounded-md bg-zinc-300/50 px-2 py-1 font-semibold hover:bg-zinc-300/80 xmd:px-4 xmd:py-1.5"
                  onClick={() => {
                    setIsUpdateProfileData(true);
                  }}
                >
                  <MdMode className="text-lg" />
                  <span className="pt-0.5">Edit Profile</span>
                </button>
              )}

            {user && profile && user._id !== profile._id && (
              <ProfileHeaderFriendButton profile={profile} user={user} />
            )}
          </div>
        </div>
        <ProfileHeaderNav profile={profile} />
      </section>
    </>
  );
};

export default ProfileHeaderData;
