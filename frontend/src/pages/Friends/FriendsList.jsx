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
    <section className="mx-auto max-w-4xl bg-[#fbfcfe] px-4 py-10 lg:w-[65%] lg:max-w-none">
      <h1 className="pb-4 text-center text-2xl font-semibold lg:text-start">
        Friends List
      </h1>

      <div className="mb-[70px] flex flex-wrap justify-center gap-5 lg:justify-start">
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
          <span className="text-[17px]"> No friends yet</span>
        )}
        {error && <Error error={error} />}
      </div>
    </section>
  );
};

export default FriendsList;
