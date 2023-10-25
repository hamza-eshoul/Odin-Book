// components
import FriendsIncomingRequests from "./FriendsIncomingRequests";
import FriendsSentRequests from "./FriendsSentRequests";

const FriendsRequests = () => {
  return (
    <section className="mx-auto max-w-4xl bg-[#fbfcfe] px-4 py-10 lg:w-[65%] lg:max-w-none">
      <FriendsIncomingRequests />
      <FriendsSentRequests />
    </section>
  );
};

export default FriendsRequests;
