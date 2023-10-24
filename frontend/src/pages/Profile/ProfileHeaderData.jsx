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

      <section className="absolute -bottom-[145px] left-10 flex w-[95%] flex-col gap-6">
        <div className="flex items-end gap-2">
          <ProfileHeaderProfileImage
            profile={profile}
            setProfile={setProfile}
          />

          <div className="flex w-[85%] items-center justify-between">
            {profile && (
              <h2 className="text-3xl font-semibold">
                {" "}
                {profile.firstName} {profile.lastName}{" "}
              </h2>
            )}

            {user && profile && user._id == profile._id && (
              <button
                className="flex items-center gap-2 rounded-md bg-zinc-300/50 px-4 py-1.5 font-semibold hover:bg-zinc-300/80"
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
