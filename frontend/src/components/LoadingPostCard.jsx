const LoadingPostCard = () => {
  return (
    <section className="flex flex-col gap-4 rounded-md border-[0.4px] border-zinc-100 bg-white px-6 py-3 shadow">
      <header className="flex w-full items-center justify-between">
        <div className="flex gap-3">
          <div className="flex items-center justify-center">
            <div className="h-12 w-12">
              <div className="h-12 w-12 animate-pulse rounded-full border-[1px] border-white bg-slate-200" />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-2">
            <div className="h-2 w-20 animate-pulse  rounded bg-zinc-200" />
            <div className="h-2 w-20 animate-pulse  rounded bg-zinc-200" />
          </div>
        </div>
      </header>

      <div className="h-3 w-full animate-pulse rounded bg-zinc-200" />
      <div className="h-3 w-full animate-pulse rounded bg-zinc-200" />
      <div className="mb-5 h-3 w-full  animate-pulse rounded bg-zinc-200" />
    </section>
  );
};

export default LoadingPostCard;
