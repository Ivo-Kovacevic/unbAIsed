import { fetchArticleByTitle } from "@/app/lib/data";
import EditSources from "@/app/ui/admin/edit-sources";
import { SourcesSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const decodedSlug = decodeURIComponent(slug);
  const article = await fetchArticleByTitle(decodedSlug);

  if (!article) {
    return;
  }

  return (
    <form className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">ARTICLE</h1>

        <label htmlFor="article-title" className="block">
          <h1>Title:</h1>
          <input
            defaultValue={article.title}
            name="article-title"
            id="article-title"
            className="w-full rounded-l-3xl border-2 p-2"
          />
        </label>

        <label htmlFor="article-text" className="block">
          <h2>Text:</h2>
          <textarea
            defaultValue={article.text}
            name="article-text"
            id="article-text"
            rows={20}
            className="w-full rounded-l-3xl border-2 p-2"
          />
        </label>
      </div>

      <Suspense fallback={<SourcesSkeleton />}>
        <EditSources article={article} />
      </Suspense>
    </form>
  );
}
