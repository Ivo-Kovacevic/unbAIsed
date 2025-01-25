"use client";

import { Status, Source, Article as PrismaArticle, Article } from "@prisma/client";
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";
import SourceForm from "./source-form";
import Button from "../Button";
import { scrapeAllWebsites } from "@/lib/actions";
import { SourceSkeleton, SourcesSkeleton } from "../skeletons";
import { v4 as uuid } from "uuid";
import { isValidURL } from "@/lib/utils";
import { useParams } from "next/navigation";

type SourcesForm = {
  sources: Source[];
  setSources: Dispatch<SetStateAction<Source[]>>;
};

export default function SourcesForm({ sources, setSources }: SourcesForm) {
  const { id: articleId } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);

  const handelScrapeAllWebsites = async () => {
    try {
      setLoading(true);
      const urls = sources.map((source) => source.url).filter(Boolean);
      const results = await scrapeAllWebsites(urls);

      const updatedSources = results.map((result, i) => {
        if (result.success) {
          return { ...sources[i], text: result.text, error: null };
        } else {
          return { ...sources[i], error: result.error };
        }
      });

      setSources(updatedSources);
    } finally {
      setLoading(false);
    }
  };

  const handelAddSource = async () => {
    setSources([
      ...sources,
      {
        id: uuid(),
        url: "",
        text: "",
        createdAt: new Date(),
        articleId: articleId ? articleId : "new-article",
      },
    ]);
  };

  const allURLsValid = sources.every((source) => isValidURL(source.url)) && sources.length > 0;

  if (loading) {
    return <SourcesSkeleton />;
  }

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        {sources.map((source, index) => (
          <Suspense key={source.id} fallback={<SourceSkeleton />}>
            <SourceForm source={source} index={index} setSources={setSources} />
          </Suspense>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <Button
          type="button"
          onClick={handelAddSource}
          className="bg-dark-primary text-light-primary hover:border-dark-secondary hover:bg-dark-secondary"
        >
          Add new source
        </Button>
        <Button
          type="button"
          onClick={handelScrapeAllWebsites}
          className={`bg-dark-primary text-light-primary ${allURLsValid ? "hover:border-dark-secondary hover:bg-dark-secondary" : "hover:cursor-not-allowed"}`}
          disabled={!allURLsValid}
        >
          Scrape all URLs
        </Button>
      </div>

      <input type="hidden" name="noOfSources" value={sources.length} />
    </>
  );
}
