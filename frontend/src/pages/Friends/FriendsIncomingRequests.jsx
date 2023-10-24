import { useFetchIncomingFriendsRequests } from "../../hooks/useFetch/useFetchIncomingFriendsRequests";

// components
import Error from "../../components/Error";
import IncomingFriendRequestCard from "./IncomingFriendRequestCard";

const pending_requests_cards = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
];

const FriendsIncomingRequests = () => {
  const { incomingFriendsRequests, isPending, error } =
    useFetchIncomingFriendsRequests();

  return (
    <div className="border-b-[1px] border-zinc-400/30 pb-10">
      <h1 className="pb-4 text-2xl font-semibold">Incoming Requests</h1>

      <div className="flex flex-wrap gap-5">
        {isPending &&
          pending_requests_cards.map((card) => (
            <IncomingFriendRequestCard key={card.id} isCardLoading={true} />
          ))}

        {!isPending &&
          incomingFriendsRequests &&
          incomingFriendsRequests.length !== 0 &&
          incomingFriendsRequests.map((request) => (
            <IncomingFriendRequestCard
              key={request._id}
              firstName={request.firstName}
              lastName={request.lastName}
              id={request._id}
              profile_image={request.profileImg.url}
            />
          ))}

        {!isPending &&
          incomingFriendsRequests &&
          incomingFriendsRequests.length == 0 && (
            <h2 className="text-[17px]"> No Incoming Requests</h2>
          )}
        {error && <Error error={error} />}
      </div>
    </div>
  );
};

export default FriendsIncomingRequests;
