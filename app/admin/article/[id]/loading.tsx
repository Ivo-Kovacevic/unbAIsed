import { ArticleSkeleton, SourcesSkeleton } from "@/app/ui/skeletons";

export default function Loading() {
  return (
    <>
      <ArticleSkeleton />
      <SourcesSkeleton />
    </>
  );
}