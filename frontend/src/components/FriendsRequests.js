import React from "react";

const FriendsRequests = () => {
  return (
    <div className="px-14 py-10 w-4/5">
      {/* Incoming Requests */}
      <div className="border-b-[1px] border-zinc-400/30 pb-10">
        <h1 className="text-2xl font-semibold pb-4">Incoming Requests</h1>
        <h3> No requests yet</h3>
      </div>

      {/* Sent Requests */}
      <div className="pt-10">
        <h1 className="text-2xl font-semibold pb-4">Sent Requests</h1>
        <h3> No requests yet</h3>
      </div>
    </div>
  );
};

export default FriendsRequests;
