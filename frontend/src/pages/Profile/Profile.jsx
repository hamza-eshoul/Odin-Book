import { useFetchProfile } from "../../hooks/useFetch/useFetchProfile";
import { Outlet } from "react-router-dom";

// components
import ProfileHeader from "./ProfileHeader";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const Profile = () => {
  const { profile, setProfile, isPending, error } = useFetchProfile();

  if (isPending) {
    return (
      <Loading
        loadingColor={"#0066dd"}
        loadingHeight={"h-screen"}
        loadingSize={60}
      />
    );
  }

  if (error) {
    return <Error />;
  }

  return (
    <main className="min-h-screen bg-[#fbfcfe] pb-20 pt-16">
      <ProfileHeader profile={profile} setProfile={setProfile} />

      <Outlet
        context={{
          profile,
        }}
      />
    </main>
  );
};

export default Profile;
