const LoadingFriendCard = () => {
  return (
    <div className="flex w-[230px] flex-col items-center rounded-xl border-[1px] border-zinc-200 bg-white shadow-lg">
      <div className="mb-8 mt-6 h-36 w-36 animate-pulse rounded-full bg-slate-200" />
      <div className="my-5 h-3.5 w-4/5 animate-pulse rounded bg-zinc-200" />
      <div className="mb-10 h-3.5 w-4/5 animate-pulse rounded bg-zinc-200" />
    </div>
  );
};

export default LoadingFriendCard;
