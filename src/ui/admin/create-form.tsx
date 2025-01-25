"use client";

import { Suspense, useActionState, useState } from "react";
import { Source, Status } from "@prisma/client";
import { newArticle } from "@/lib/actions";
import SourcesForm from "./sources-form";
import Button from "../Button";
import { SourcesSkeleton } from "../skeletons";

export default function Form() {
  const [sources, setSources] = useState<Source[]>([]);
  const [data, formAction] = useActionState(newArticle, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="mr-auto text-3xl font-bold">ARTICLE</h1>
          <div className="rounded-full border-2 border-pending bg-pending px-4 py-2 text-white">
            DRAFT
          </div>
          <Button className="bg-dark-primary text-light-primary hover:border-dark-secondary hover:bg-dark-secondary">
            Create article
          </Button>
        </div>

        <label htmlFor="article-title" className="block">
          <h1 className="font-bold">Title:</h1>
          <input
            name="article-title"
            id="article-title"
            className="w-full rounded-3xl border-2 p-2"
          />
        </label>

        <label htmlFor="article-text" className="block">
          <h2 className="font-bold">Text:</h2>
          <textarea
            name="article-text"
            id="article-text"
            rows={20}
            className="w-full rounded-l-3xl border-2 p-2"
          />
        </label>

        <div>
          <h2 className="font-bold">Status:</h2>
          <div className="flex gap-8">
            <label className="flex items-center gap-2">
              <input type="radio" name="article-status" defaultChecked value={Status.DRAFT} />
              Draft
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="article-status" value={Status.PUBLISHED} />
              Publish
            </label>
          </div>
        </div>
      </div>

      <Suspense fallback={<SourcesSkeleton />}>
        <SourcesForm sources={sources} setSources={setSources} />
      </Suspense>

      <input type="hidden" name="noOfSources" value={sources.length} />
    </form>
  );
}
