import { useState } from "react";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";

// icons
import { BsCamera2 } from "react-icons/bs";

// components
import Overlay from "../../components/Overlay";
import UpdateProfileCoverImage from "../../components/UpdateProfileCoverImage";

const ProfileHeaderCoverImage = ({ profile, setProfile }) => {
  const [isUpdateCoverImage, setIsUpdateCoverImage] = useState(false);
  const { user } = useAuthContext();
  return (
    <>
      {isUpdateCoverImage && (
        <>
          <Overlay />
          <UpdateProfileCoverImage
            profile={profile}
            setProfile={setProfile}
            setIsUpdateCoverImage={setIsUpdateCoverImage}
          />
        </>
      )}

      {user && profile && user._id == profile._id && (
        <div
          className="absolute bottom-4 right-4 z-10 flex cursor-pointer items-center gap-2  rounded-lg bg-[#797a7b] px-3 py-2 font-medium text-white hover:bg-zinc-500"
          onClick={() => setIsUpdateCoverImage(true)}
        >
          <BsCamera2 />
          <button>Edit cover image</button>
        </div>
      )}

      <div className="relative h-[500px]">
        {profile && profile.coverImg.url && (
          <img
            src={profile.coverImg.url}
            className="object-fit h-full w-full rounded-b-lg"
          />
        )}
        {profile && !profile.coverImg.url && (
          <div className="h-full w-full rounded-b-lg bg-gradient-to-b from-zinc-100 from-70% to-zinc-400" />
        )}
      </div>
    </>
  );
};

export default ProfileHeaderCoverImage;
