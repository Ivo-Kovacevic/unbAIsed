"use client";

import { Source, State } from "@/app/@types/types";
import { createNews, scrapeAllWebsites } from "@/app/lib/actions";
import Button from "@/app/ui/Button";
import { useActionState, useState } from "react";
import { v4 as uuid } from "uuid";

export default function Page() {
  const [sources, setSources] = useState<Source[]>([]);
  const [scrapingAll, setScrapingAll] = useState(false);
  const [state, formAction] = useActionState(createNews, undefined);

  const addSource = () =>
    setSources([...sources, { id: uuid(), url: "", text: "", isLoading: false, error: null }]);
  const removeSource = (index: number) => setSources(sources.filter((_, i) => i !== index));
  const updateSource = (index: number, updates: Partial<Source>) => {
    setSources(sources.map((source, i) => (i === index ? { ...source, ...updates } : source)));
  };

  const handleScrapeWebsites = async (index?: number) => {
    const isSingleScrape = typeof index === "number";
    let urls;
    if (isSingleScrape) {
      // Scrap only single source
      updateSource(index, { isLoading: true, error: null });
      urls = [sources[index].url];
    } else {
      // Handle scraping for all sources
      setScrapingAll(true);
      urls = sources.map((source) => source.url).filter(Boolean);
    }

    const results = await scrapeAllWebsites(urls);

    if (isSingleScrape) {
      // Update only single source
      if (results[0].success) {
        updateSource( index, { text: results[0].text, error: null });
      } else {
        updateSource(index, { error: results[0].error });
      }
    } else {
      // Update all sources
      const updatedSources = results.map((result, i) => {
        if (result.success) {
          return { ...sources[i], text: result.text, error: null };
        } else {
          return { ...sources[i], error: result.error };
        }
      });
      setSources(updatedSources);
      setScrapingAll(false);
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-bold">Create article</h1>
      <form action={formAction} className="flex flex-col gap-8">
        <div>
          <Button type="submit" className="bg-foreground text-background">
            Create draft
          </Button>
          <label htmlFor="article-title" className="flex flex-col">
            Article text:
            <input
              id="article-title"
              name="article-title"
              className="rounded-2xl border-2 p-3"
              placeholder="Generated news title will appear here..."
            />
          </label>

          <label htmlFor="article-text" className="flex flex-col">
            Article text:
            <textarea
              rows={10}
              id="article-text"
              name="article-text"
              className="rounded-2xl border-2 p-3"
              placeholder="Generated news will appear here..."
            ></textarea>
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {sources.map((source, index) => (
            <div key={source.id}>
              <label htmlFor={`url-${index}`} className="flex flex-col font-bold">
                Source {index + 1} URL:
                <input
                  type="text"
                  id={`url-${index}`}
                  name={`url-${index}`}
                  className="rounded-2xl border-2 p-2"
                  placeholder="https://example.com/article"
                  value={source.url}
                  onChange={(e) => updateSource(index, { url: e.target.value })}
                />
              </label>

              <label htmlFor={`text-${index}`} className="flex flex-col">
                Source {index + 1} text:
                <textarea
                  rows={5}
                  id={`text-${index}`}
                  name={`text-${index}`}
                  value={source.text}
                  onChange={(e) => updateSource(index, { text: e.target.value })}
                  className="rounded-2xl border-2 p-3"
                  placeholder="Source text will appear here..."
                ></textarea>
              </label>

              <div className="flex gap-4">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrapeWebsites(index);
                  }}
                  disabled={source.isLoading || !source.url || scrapingAll}
                  className={`bg-foreground text-background ${source.isLoading || !source.url || scrapingAll ? "hover:cursor-not-allowed" : ""}`}
                >
                  {source.isLoading || scrapingAll ? "Scraping..." : "Scrape website"}
                </Button>
                <Button onClick={() => removeSource(index)}>Delete source</Button>
              </div>
            </div>
          ))}
        </div>
      </form>

      <div className="flex gap-4 py-4">
        <Button
          onClick={() => handleScrapeWebsites()}
          disabled={scrapingAll || sources.length === 0 || !sources.every((source) => source.url)}
          className={`bg-foreground text-background ${scrapingAll || sources.length === 0 || !sources.every((source) => source.url) ? "hover:cursor-not-allowed" : ""}`}
        >
          {scrapingAll ? "Scraping all website..." : "Scrape all websites"}
        </Button>
        <Button onClick={addSource}>Add new source</Button>
      </div>
    </section>
  );
}
