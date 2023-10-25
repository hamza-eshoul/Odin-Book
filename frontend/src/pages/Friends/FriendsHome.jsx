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
    <section className="mx-auto max-w-4xl bg-[#fbfcfe] px-4 py-10 lg:w-[65%] lg:max-w-none">
      <h1 className="pb-4 text-center text-2xl font-semibold lg:text-start">
        Find new friends
      </h1>

      <div className="mb-[70px] flex flex-wrap justify-center gap-5 lg:justify-start">
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
          <p className="text-[17px]"> No friends to add </p>
        )}

        {error && <Error error={error} />}
      </div>
    </section>
  );
};

export default FriendsHome;
