import { fetchArticleById, fetchSourcesByArticleId } from "@/lib/actions";
import { Status } from "@prisma/client";
import Link from "next/link";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const article = await fetchArticleById(id);
  const sources = await fetchSourcesByArticleId(id);

  if (!article || !sources) {
    return;
  }

  return (
    <>
      <section className="mb-16">
        <article>
          <div className="flex items-center gap-2">
            <h1 className="mr-auto text-3xl font-bold">ARTICLE</h1>
            <div
              className={`rounded-full border-2 px-4 py-2 text-center text-white ${article.status === Status.DRAFT ? "border-pending bg-pending" : "border-good bg-good"}`}
            >
              {article.status}
            </div>
            <Link
              href={`/admin/article/${article.id}/edit`}
              className="block w-24 rounded-full border-2 border-neutral-900 bg-neutral-900 px-4 py-2 text-center text-white transition-colors hover:border-neutral-700 hover:bg-neutral-700"
            >
              Edit
            </Link>
          </div>

          <div>
            <h1>Title:</h1>
            <div className="rounded-3xl border-2 p-2">
              <h1>{article.title}</h1>
            </div>
          </div>

          <div>
            <h2>Text:</h2>
            <div className="h-[500px] rounded-l-3xl border-2 p-2">
              <p>{article.text}</p>
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {sources.map((source, index) => (
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
              <div className="h-[500px] overflow-auto rounded-l-3xl border-2 p-2">
                <p>{source.text}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
