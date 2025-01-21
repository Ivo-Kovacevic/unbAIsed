"use client";

import { Source, Status } from "@prisma/client";
import { Suspense, useEffect, useState } from "react";
import EditSource from "./edit-source";
import Button from "../Button";
import { scrapeAllWebsites } from "@/app/lib/actions";
import { SourceSkeleton, SourcesSkeleton } from "../skeletons";
import { v4 as uuid } from "uuid";

type Article = {
  id: string;
  title: string;
  text: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  sources: Source[];
};

export default function EditSources({ article }: { article: Article }) {
  const [loading, setLoading] = useState(false);
  const [sources, setSources] = useState(article.sources);

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
        articleId: article.id,
      },
    ]);
  };

  if (loading) {
    return <SourcesSkeleton />;
  }

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        {sources.map((source, index) => (
          <Suspense key={source.id} fallback={<SourceSkeleton />}>
            <EditSource source={source} index={index} setSources={setSources} />
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
          className="bg-dark-primary text-light-primary hover:border-dark-secondary hover:bg-dark-secondary"
        >
          Scrape all URLs
        </Button>
      </div>
    </>
  );
}
