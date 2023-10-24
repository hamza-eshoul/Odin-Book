// components
import FriendsIncomingRequests from "./FriendsIncomingRequests";
import FriendsSentRequests from "./FriendsSentRequests";

const FriendsRequests = () => {
  return (
    <div className="w-4/5 space-y-8  bg-[#fbfcfe] px-14 py-10">
      <FriendsIncomingRequests />
      <FriendsSentRequests />
    </div>
  );
};

export default FriendsRequests;
