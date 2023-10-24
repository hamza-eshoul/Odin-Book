import { useOutletContext } from "react-router-dom";

// components
import ProfileFriendsList from "./ProfileFriendsList";
import ProfileAbout from "./ProfileAbout";
import ProfilePosts from "./ProfilePosts";

const ProfileHome = () => {
  const { profile } = useOutletContext();

  if (profile) {
    return (
      <main className="mx-auto flex w-[65%] gap-8">
        <div className="mt-6 flex w-1/3 flex-col gap-4">
          <ProfileAbout profile={profile} />
          <ProfileFriendsList profile_id={profile._id} />
        </div>

        <ProfilePosts profile_id={profile._id} />
      </main>
    );
  }
};

export default ProfileHome;
