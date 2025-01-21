export const ArticlesSkeleton = () => {
  return (
    <>
      {Array.from({ length: 18 }).map((__, i) => (
        <div key={i} className="animate-pulse border-2 bg-gray-200 p-2">
          <h1 className="mb-2 h-6 bg-gray-300 text-xl font-bold"></h1>
          <p className="mb-2 h-4 w-1/4 bg-gray-300"></p>
          <p className="mb-2 h-4 w-1/4 bg-gray-300"></p>
          <p className="mb-2 h-3 w-2/5 bg-gray-300"></p>
          <p className="h-3 w-2/5 bg-gray-300"></p>
        </div>
      ))}
    </>
  );
};

export const SourceSkeleton = () => {
  return (
    <div>
      <h2 className="mt-1 h-5 w-1/4 animate-pulse rounded bg-gray-300"> </h2>

      <div className="mt-2 h-3 w-1/5 animate-pulse rounded bg-gray-300"></div>
      <div className="mt-2 h-11 animate-pulse rounded-full bg-gray-300"></div>

      <div className="mt-2 h-3 w-1/5 animate-pulse rounded bg-gray-300"></div>
      <div className="mt-2 h-[495px] animate-pulse rounded-l-3xl bg-gray-300"></div>

      <div className="mt-2 flex gap-4">
        <div className="h-11 w-32 animate-pulse rounded-full bg-gray-300"></div>
        <div className="h-11 w-32 animate-pulse rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};

export const SourcesSkeleton = () => {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <SourceSkeleton key={i} />
      ))}
    </div>
  );
};