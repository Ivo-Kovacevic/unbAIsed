import Link from "next/link";
import { Suspense } from "react";
import Articles from "../ui/admin/articles";
import { ArticlesSkeleton } from "@/app/ui/skeletons";

export default async function Page() {
  return (
    <>
      <section className="p-4">
        <article className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Admin Page</h1>
          <Link
            className="rounded-full bg-neutral-900 px-4 py-2 text-white transition-colors hover:bg-neutral-700"
            href="admin/article/create"
          >
            Create article +
          </Link>
        </article>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<ArticlesSkeleton />}>
          <Articles />
        </Suspense>
      </section>
    </>
  );
}
