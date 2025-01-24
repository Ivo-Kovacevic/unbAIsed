"use client";

import { Suspense, useActionState, useState } from "react";
import { Source, Article, Status } from "@prisma/client";
import { saveArticle } from "@/app/lib/actions";
import SourcesForm from "./sources-form";
import Button from "../Button";
import { SourcesSkeleton } from "../skeletons";
import Link from "next/link";

type Props = {
  article: Article;
  sources: Source[];
};

export default function Form({ props }: { props: Props }) {
  const [article, setArticle] = useState(props.article);
  const [sources, setSources] = useState(props.sources);
  const [initialStatus, setInitialStatus] = useState<Status>(article.status);

  return (
    <form className="flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="mr-auto text-3xl font-bold">ARTICLE</h1>
          <div
            className={`rounded-full border-2 px-4 py-2 text-white ${initialStatus === Status.DRAFT ? "bg-pending border-pending" : "bg-good border-good"}`}
          >
            {initialStatus}
          </div>
          <Link
            href={`/admin/article/${article.id}/`}
            className="block w-max rounded-full border-2 border-dark-primary bg-dark-primary px-4 py-2 text-center text-white transition-colors hover:border-dark-secondary hover:bg-dark-secondary"
          >
            Exit editing
          </Link>
          <Button
            type="button"
            onClick={() => saveArticle(article, sources)}
            className="bg-dark-primary text-light-primary hover:border-dark-secondary hover:bg-dark-secondary"
          >
            Save all changes
          </Button>
        </div>

        <label htmlFor="article-title" className="block">
          <h1>Title:</h1>
          <input
            value={article?.title}
            name="article-title"
            id="article-title"
            className="w-full rounded-3xl border-2 p-2"
            onChange={(e) => setArticle({ ...article, title: e.target.value })}
          />
        </label>

        <label htmlFor="article-text" className="block">
          <h2>Text:</h2>
          <textarea
            value={article.text}
            name="article-text"
            id="article-text"
            rows={20}
            className="w-full rounded-l-3xl border-2 p-2"
            onChange={(e) => setArticle({ ...article, text: e.target.value })}
          />
        </label>

        <div>
          <h2 className="font-bold">Status:</h2>
          <div className="flex gap-8">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="article-status"
                checked={article.status === Status.DRAFT}
                value={Status.DRAFT}
                onChange={() => setArticle({ ...article, status: Status.DRAFT })}
              />
              Draft
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="article-status"
                checked={article.status === Status.PUBLISHED}
                value={Status.PUBLISHED}
                onChange={() => setArticle({ ...article, status: Status.PUBLISHED })}
              />
              Publish
            </label>
          </div>
        </div>
      </div>

      <Suspense fallback={<SourcesSkeleton />}>
        <SourcesForm sources={sources} setSources={setSources} />
      </Suspense>
    </form>
  );
}
