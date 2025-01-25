import { fetchFilteredArticles } from "@/lib/actions";
import Link from "next/link";
import Button from "../Button";

export default async function Articles() {
  const articles = await fetchFilteredArticles();

  return (
    <>
      {articles.map((article) => (
        <article
          key={article.id}
          className="flex flex-col border-2 p-2 transition hover:border-neutral-700"
        >
          <h1 className="text-xl font-bold">{article.title}</h1>
          <p>
            Status:{" "}
            <span
              className={`${article.status === "DRAFT" ? "text-yellow-700" : "text-green-700"}`}
            >
              {article.status}
            </span>
          </p>
          <p>
            No. of sources:{" "}
            <span className={`${article._count.sources <= 10 ? "text-red-700" : "text-green-700"}`}>
              {article._count.sources}
            </span>
          </p>
          <p className="text-sm">Created at: {article.createdAt.toLocaleDateString()}</p>
          <p className="text-sm">Updated at: {article.updatedAt.toLocaleDateString()}</p>
          <div className="mt-auto flex items-center justify-around gap-2">
            <Link
              href={`admin/article/${article.id}`}
              className="w-24 rounded-full border-2 border-neutral-900 bg-neutral-900 px-4 py-2 text-center text-white transition-colors hover:border-neutral-700 hover:bg-neutral-700"
            >
              View
            </Link>
            <Link
              href={`/admin/article/${article.id}/edit`}
              className="w-24 rounded-full border-2 border-neutral-900 bg-neutral-900 px-4 py-2 text-center text-white transition-colors hover:border-neutral-700 hover:bg-neutral-700"
            >
              Edit
            </Link>
            <Button className="w-24 hover:border-red-500 hover:bg-red-500 hover:text-white">
              Delete
            </Button>
          </div>
        </article>
      ))}
    </>
  );
}
