import { useState } from "react";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";

// icons
import { BsFillCameraFill } from "react-icons/bs";

// images
import defaultProfile from "../../assets/images/defaultProfile.png";

// components
import Overlay from "../../components/Overlay";
import UpdateProfileImage from "../../components/UpdateProfileImage";

const ProfileHeaderProfileImage = ({ profile, setProfile }) => {
  const [isUpdateProfileImage, setIsUpdateProfileImage] = useState(false);
  const { user } = useAuthContext();
  return (
    <>
      {isUpdateProfileImage && (
        <>
          <Overlay />
          <UpdateProfileImage
            profile={profile}
            setProfile={setProfile}
            setIsUpdateProfileImage={setIsUpdateProfileImage}
          />
        </>
      )}

      {user && profile && user._id == profile._id && (
        <div
          className="absolute left-[130px] top-[130px] z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200"
          onClick={() => {
            setIsUpdateProfileImage(true);
          }}
        >
          <BsFillCameraFill className="text-2xl" />
        </div>
      )}

      <div className="relative h-44 w-44">
        {profile && profile.profileImg.url && (
          <img
            src={profile.profileImg.url}
            alt="profile image"
            className="h-full w-full rounded-full bg-white p-1.5"
          />
        )}

        {profile && !profile.profileImg.url && (
          <img
            src={defaultProfile}
            alt="profile image"
            className="h-full w-full rounded-full bg-white p-1.5"
          />
        )}
      </div>
    </>
  );
};

export default ProfileHeaderProfileImage;
