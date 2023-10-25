import { useOutletContext } from "react-router-dom";

// components
import ProfileFriendsList from "./ProfileFriendsList";
import ProfileAbout from "./ProfileAbout";
import ProfilePosts from "./ProfilePosts";

const ProfileHome = () => {
  const { profile } = useOutletContext();

  if (profile) {
    return (
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-3.5 sm:px-20 xmd:flex-row xmd:px-4">
        <section className="mt-6 flex w-full flex-col gap-4 xmd:w-1/3">
          <ProfileAbout profile={profile} />
          <ProfileFriendsList profile_id={profile._id} />
        </section>

        <ProfilePosts profile_id={profile._id} />
      </section>
    );
  }
};

export default ProfileHome;
