import ProfileHeaderCoverImage from "./ProfileHeaderCoverImage";
import ProfileHeaderData from "./ProfileHeaderData";

const ProfileHeader = ({ profile, setProfile }) => {
  return (
    <>
      <section className="h-[645px] border-b-[1.5px] border-zinc-200 bg-white shadow-sm">
        <div className="relative mx-auto max-w-6xl">
          <ProfileHeaderCoverImage profile={profile} setProfile={setProfile} />
          <ProfileHeaderData profile={profile} setProfile={setProfile} />
        </div>
      </section>
    </>
  );
};

export default ProfileHeader;
