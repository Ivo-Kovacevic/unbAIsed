"use client";

import { Source } from "@prisma/client";
import { Suspense, useState } from "react";
import EditSource from "./edit-source";
import Button from "../Button";
import { scrapeAllWebsites } from "@/app/lib/actions";
import { SourceSkeleton, SourcesSkeleton } from "../skeletons";

export default function EditSources({ articleSources }: { articleSources: Source[] }) {
  const [loading, setLoading] = useState(false);
  const [sources, setSources] = useState(articleSources);

  const handelScrapeAllWebsites = async () => {
    setLoading(true);
    try {
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
      <Button
        type="button"
        onClick={handelScrapeAllWebsites}
        className="bg-dark-primary text-light-primary hover:bg-dark-secondary hover:border-dark-secondary"
      >
        Scrape all URLs
      </Button>
    </>
  );
}
