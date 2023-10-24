import { useFetchnNonFriends } from "../../hooks/useFetch/useFetchNonFriends";

// components
import Error from "../../components/Error";
import NonFriendCard from "./NonFriendCard";

const pending_friends_cards = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
];

const FriendsHome = () => {
  const { nonFriendsList, isPending, error } = useFetchnNonFriends();

  return (
    <div className="w-4/5 bg-[#fbfcfe] px-14 py-10">
      <h1 className="pb-4 text-2xl font-semibold">Find new friends</h1>

      <div className=" flex flex-wrap gap-5">
        {isPending &&
          pending_friends_cards.map((card) => (
            <NonFriendCard key={card.id} isCardLoading={true} />
          ))}

        {!isPending &&
          nonFriendsList &&
          nonFriendsList.length !== 0 &&
          nonFriendsList.map((non_friend) => (
            <NonFriendCard
              key={non_friend._id}
              firstName={non_friend.firstName}
              lastName={non_friend.lastName}
              id={non_friend._id}
              profile_image={non_friend.profileImg.url}
            />
          ))}

        {!isPending && nonFriendsList && nonFriendsList.length == 0 && (
          <h3 className="text-[17px]"> No friends to add </h3>
        )}

        {error && <Error error={error} />}
      </div>
    </div>
  );
};

export default FriendsHome;
