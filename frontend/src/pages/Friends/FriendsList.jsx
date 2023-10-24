import { useFetchFriends } from "../../hooks/useFetch/useFetchFriends";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";

// components
import FriendCard from "./FriendCard";
import Error from "../../components/Error";

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

const FriendsList = () => {
  const { user } = useAuthContext();
  const { friendsList, isPending, error } = useFetchFriends(user._id);

  return (
    <div className="w-4/5 bg-[#fbfcfe] px-14 py-10 ">
      <h1 className="pb-4 text-2xl font-semibold">Friends</h1>

      <div className="flex flex-wrap gap-5">
        {isPending &&
          pending_friends_cards.map((card) => (
            <FriendCard key={card.id} isCardLoading={true} />
          ))}

        {!isPending &&
          friendsList &&
          friendsList.length !== 0 &&
          friendsList.map((friend) => (
            <FriendCard
              key={friend._id}
              firstName={friend.firstName}
              lastName={friend.lastName}
              id={friend._id}
              profile_image={friend.profileImg.url}
            />
          ))}

        {!isPending && friendsList && friendsList.length == 0 && (
          <h2 className="text-[17px]"> No friends yet</h2>
        )}
        {error && <Error error={error} />}
      </div>
    </div>
  );
};

export default FriendsList;
