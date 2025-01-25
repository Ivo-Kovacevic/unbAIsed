import { ArticlesSkeleton } from "@/ui/skeletons";

export default function Loading() {
  return (
    <>
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold">Admin Page</div>
          <div className="h-10 w-36 animate-pulse rounded-full bg-gray-300 px-4 py-2 text-gray-300"></div>
        </div>
      </div>
      <div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ArticlesSkeleton />
        </div>
      </div>
    </>
  );
}
