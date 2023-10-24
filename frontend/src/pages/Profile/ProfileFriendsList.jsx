import { useFetchFriends } from "../../hooks/useFetch/useFetchFriends";
import { Link, useLocation } from "react-router-dom";

// components
import ProfileFriendCard from "../../components/ProfileFriendCard";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const ProfileFriendsList = ({ profile_id }) => {
  const { friendsList, isPending, error } = useFetchFriends(profile_id);
  const location = useLocation();

  return (
    <div className="space-y-3 rounded-md border-[1px] border-zinc-200 bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold"> Friends </h3>
        <Link className="text-zinc-600" to={`${location.pathname}/friends`}>
          See all friends
        </Link>
      </div>
      {isPending && <Loading loadingColor={"gray"} loadingSize={30} />}
      {friendsList && friendsList.length !== 0 && (
        <div className="flex flex-wrap gap-3">
          {friendsList.map((friend) => (
            <ProfileFriendCard
              key={friend._id}
              firstName={friend.firstName}
              lastName={friend.lastName}
              profileImg={friend.profileImg.url}
              friend_id={friend._id}
            />
          ))}
        </div>
      )}
      {friendsList && friendsList.length == 0 && (
        <div>
          <h1 className="text-[17px]"> {friendsList.length} Friends </h1>
        </div>
      )}

      {error && <Error error={error} />}
    </div>
  );
};

export default ProfileFriendsList;
