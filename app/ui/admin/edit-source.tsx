"use client";

import { Source } from "@prisma/client";
import Button from "@/app/ui/Button";
import { deleteSource, saveSource, scrapeWebsite } from "@/app/lib/actions";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { LoaderCircle, LoaderPinwheel } from "lucide-react";

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

  const handleSaveSource = async () => {
    try {
      setLoading(true);
      const result = await saveSource(source);
      if (result) {
        updateSource(index, { ...result });
      } else {
        console.error("Failed to save source");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleScrapeWebsite = async () => {
    try {
      setLoading(true);
      const article = await scrapeWebsite(source.url);
      if (article.success) {
        updateSource(index, { text: article.text });
      } else {
        console.error(article.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSource = async () => {
    try {
      setLoading(true);
      const result = await deleteSource(source);
      if (result) {
        setSources((prev) => prev.filter((_, i) => i !== index));
      }
    } finally {
      setLoading(false);
    }
  };

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
          disabled={loading}
        />
      </label>

      <label htmlFor={`source-text-${index}`} className="block">
        <h2>Source {index + 1} text:</h2>
        <div className="relative">
          <textarea
            value={source.text}
            id={`source-text-${index}`}
            rows={20}
            className="block w-full rounded-l-3xl border-2 p-2"
            onChange={(e) => updateSource(index, { text: e.target.value })}
            disabled={loading}
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-l-3xl hover:cursor-not-allowed bg-sky-900/15">
              <LoaderPinwheel className="animate-spin" height="50px" width="50px" />{" "}
            </div>
          )}
        </div>
      </label>

      <div className="mt-2 flex gap-4">
        <Button
          type="button"
          disabled={loading}
          onClick={handleSaveSource}
          className={`bg-dark-primary text-light-primary ${loading ? "hover:cursor-not-allowed" : "hover:border-dark-secondary hover:bg-dark-secondary"}`}
        >
          Save source
        </Button>
        <Button
          type="button"
          disabled={loading}
          onClick={handleScrapeWebsite}
          className={`bg-dark-primary text-light-primary ${loading ? "hover:cursor-not-allowed" : "hover:border-dark-secondary hover:bg-dark-secondary"}`}
        >
          Scrape URL
        </Button>
        <Button
          type="button"
          disabled={loading}
          onClick={handleDeleteSource}
          className={`${loading ? "hover:cursor-not-allowed" : "hover:border-danger hover:bg-danger hover:text-light-primary"}`}
        >
          Delete source
        </Button>
      </div>
    </div>
  );
}
