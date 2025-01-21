import { fetchArticleByTitle } from "@/app/lib/data";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const decodedSlug = decodeURIComponent(slug);
  const article = await fetchArticleByTitle(decodedSlug);

  if (!article) {
    return;
  }

  return (
    <>
      <section className="mb-16">
        <article>
          <h1 className="text-3xl font-bold">ARTICLE</h1>

          <div>
            <h1>Title:</h1>
            <div className="rounded-3xl border-2 p-2">
              <h1>{article.title}</h1>
            </div>
          </div>

          <div>
            <h2>Text:</h2>
            <div className="rounded-3xl border-2 p-2">
              <p>{article.text}</p>
            </div>
          </div>

          <Link
            href={`/admin/article/${article.title}/edit`}
            className="mt-4 block w-24 rounded-full border-2 border-neutral-900 bg-neutral-900 px-4 py-2 text-center text-white transition-colors hover:border-neutral-700 hover:bg-neutral-700"
          >
            Edit
          </Link>
        </article>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        {article.sources.map((source, index) => (
          <article key={source.id}>
            <h2 className="text-xl font-bold">SOURCE {index + 1}</h2>

            <div>
              <h2>Source {index + 1} url:</h2>
              <div className="rounded-3xl border-2 p-2">
                <a href={source.url} target="_blank" className="hover:underline">
                  {source.url}
                </a>
              </div>
            </div>

            <div>
              <h2>Source {index + 1} text:</h2>
              <div className="max-h-80 overflow-auto rounded-l-3xl border-2 p-2">
                <p>{source.text}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
