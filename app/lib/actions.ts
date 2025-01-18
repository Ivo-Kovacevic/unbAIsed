"use server";

import { getArticleText } from "./scraper";

export const scrapeWebsite = async (url: string) => {
  try {
    const text = await getArticleText(url);
    return { success: true, text };
  } catch (error) {
    return { success: false, error: "Failed to scrape the website." };
  }
};

export async function scrapeAllWebsites(urls: string[]) {
  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        const text = await getArticleText(url);
        return { url, success: true, text, error: null };
      } catch (error) {
        return { url, success: false, text: "", error: "Failed to scrape the website." };
      }
    }),
  );
  return results;
}
