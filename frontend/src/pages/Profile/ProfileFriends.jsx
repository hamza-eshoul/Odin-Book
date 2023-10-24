import { useOutletContext } from "react-router-dom";
import { useFetchFriends } from "../../hooks/useFetch/useFetchFriends";

// components
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import ProfileFriendCard from "../../components/ProfileFriendCard";

const ProfileFriends = () => {
  const { profile } = useOutletContext();
  const { friendsList, isPending, error } = useFetchFriends(
    profile ? profile._id : null,
  );

  return (
    <main>
      <div className="mx-auto mt-5 flex w-[65%] flex-col gap-4 rounded-md border-[1px] border-zinc-200 bg-white px-3 py-4 shadow">
        <h1 className="px-3 text-2xl font-semibold"> Friends </h1>

        {isPending && <Loading loadingColor={"gray"} loadingSize={40} />}
        {friendsList && friendsList.length !== 0 && (
          <div className="flex flex-wrap gap-3 rounded-lg">
            {friendsList.map((friend) => (
              <div className="flex w-[48%] items-center gap-3 rounded border-[1px] border-zinc-200 p-4">
                <ProfileFriendCard
                  key={friend._id}
                  firstName={friend.firstName}
                  lastName={friend.lastName}
                  profileImg={friend.profileImg.url}
                  friend_id={friend._id}
                  isRowCard={true}
                />
              </div>
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
    </main>
  );
};

export default ProfileFriends;
