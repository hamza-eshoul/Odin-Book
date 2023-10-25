import { useFetchSentFriendsRequests } from "../../hooks/useFetch/useFetchSentFriendsRequests";

// components
import Error from "../../components/Error";
import SentFriendsRequestCard from "./SentFriendsRequestCard";

const pending_requests_cards = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
];

const FriendsSentRequests = () => {
  const { sentFriendsRequests, isPending, error } =
    useFetchSentFriendsRequests();

  return (
    <section className="border-b-[1px] border-zinc-400/30 pb-10">
      <h1 className="pb-4 text-center text-2xl font-semibold lg:text-start">
        Sent Requests
      </h1>

      <div className="mb-[70px] flex flex-wrap justify-center gap-5 lg:justify-start">
        {isPending &&
          pending_requests_cards.map((card) => (
            <SentFriendsRequestCard key={card.id} isCardLoading={true} />
          ))}

        {!isPending &&
          sentFriendsRequests &&
          sentFriendsRequests.length !== 0 &&
          sentFriendsRequests.map((request) => (
            <SentFriendsRequestCard
              key={request._id}
              firstName={request.firstName}
              lastName={request.lastName}
              id={request._id}
              profile_image={request.profileImg.url}
            />
          ))}

        {!isPending &&
          sentFriendsRequests &&
          sentFriendsRequests.length == 0 && (
            <span className="text-[17px]"> No Sent Requests</span>
          )}
        {error && <Error error={error} />}
      </div>
    </section>
  );
};

export default FriendsSentRequests;
