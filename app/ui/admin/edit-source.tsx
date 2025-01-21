"use client";

import { Source } from "@prisma/client";
import Button from "@/app/ui/Button";
import { scrapeWebsite } from "@/app/lib/actions";
import { Dispatch, SetStateAction, useState } from "react";
import { SourceSkeleton } from "../skeletons";

type EditType = {
  source: Source;
  index: number;
  setSources: Dispatch<SetStateAction<Source[]>>;
};

export default function EditSource({ source, index, setSources }: EditType) {
  const [loading, setLoading] = useState(false);

  const updateSource = (index: number, updates: Partial<Source>) => {
    setSources((prev) =>
      prev.map((source, i) => (i === index ? { ...source, ...updates } : source)),
    );
  };

  const handleScrapeWebsite = async () => {
    setLoading(true);
    try {
      const article = await scrapeWebsite(source.url);
      if (article.success) {
        updateSource(index, { text: article.text });
      } else {
        console.log(article.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteSource = async () => {};

  if (loading) {
    return <SourceSkeleton />;
  }

  return (
    <div>
      <h2 className="text-xl font-bold">SOURCE {index + 1}</h2>

      <label htmlFor={`source-url-${index}`} className="block">
        <h2>Source {index + 1} url:</h2>
        <input
          value={source.url}
          id={`source-url-${index}`}
          className="w-full rounded-3xl border-2 p-2"
          onChange={(e) => updateSource(index, { url: e.target.value })}
        />
      </label>

      <label htmlFor={`source-text-${index}`} className="block">
        <h2>Source {index + 1} text:</h2>
        <textarea
          value={source.text}
          id={`source-text-${index}`}
          rows={20}
          className="w-full rounded-l-3xl border-2 p-2"
          onChange={(e) => updateSource(index, { text: e.target.value })}
        />
      </label>

      <div className="flex gap-4">
        <Button
          type="button"
          onClick={handleScrapeWebsite}
          className="bg-dark-primary text-light-primary hover:bg-dark-secondary hover:border-dark-secondary"
        >
          Scrape URL
        </Button>
        <Button
          type="button"
          onClick={deleteSource}
          className="hover:bg-danger hover:text-light-primary hover:border-danger"
        >
          Delete source
        </Button>
      </div>
    </div>
  );
}
