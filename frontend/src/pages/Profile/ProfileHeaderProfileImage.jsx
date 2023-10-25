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

      <div className="relative h-40 w-40 xmd:h-44 xmd:w-44">
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
        {user && profile && user._id == profile._id && (
          <div
            className="absolute left-[115px] top-[115px] z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 xmd:left-[130px] xmd:top-[130px] xmd:h-10 xmd:w-10"
            onClick={() => {
              setIsUpdateProfileImage(true);
            }}
          >
            <BsFillCameraFill className="text-xl xmd:text-2xl" />
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileHeaderProfileImage;
