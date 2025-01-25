"use server";

import { prisma } from "@/db/prisma";
import { getArticleText } from "@/lib/scraper";
import { Article, Source } from "@prisma/client";
import {
  createArticle,
  createSource,
  findArticleById,
  findSource,
  findSourcesByArticleId,
  updateArticle,
  updateSource,
  deleteSourceById,
} from "@/db/queries";
import { redirect } from "next/navigation";

export async function newArticle(prevState: unknown, formData: FormData) {
  const title = formData.get("article-title") as string;
  const text = formData.get("article-text") as string;
  const article = await createArticle(title, text);

  const noOfSources = parseInt(formData.get("noOfSources") as string);
  for (let i = 0; i < noOfSources; i++) {
    const url = formData.get(`source-url-${i}`) as string;
    const text = formData.get(`source-text-${i}`) as string;
    await createSource(url, text, article.id);
  }

  redirect(`/admin/article/${article.id}/`);
}

export async function saveArticle(article: Article, sources: Source[]) {
  await updateArticle(article.id, article.title, article.text, article.status);
  for (const source of sources) {
    const sourceExists = await findSource(source.id);
    if (sourceExists) {
      await updateSource(source.id, source.url, source.text);
    } else {
      await createSource(source.url, source.text, article.id);
    }
  }

  redirect(`/admin/article/${article.id}/`);
}

export const fetchFilteredArticles = async () => {
  return await prisma.article.findMany({
    include: {
      _count: {
        select: { sources: true },
      },
    },
  });
};

export const fetchArticleById = async (id: string) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const article = await findArticleById(id);
  if (article) {
    return article;
  } else {
    return;
  }
};

export const fetchSourcesByArticleId = async (id: string) => {
  const sources = await findSourcesByArticleId(id);
  if (sources) {
    return sources;
  } else {
    return;
  }
};

export async function deleteSource(source: Source) {
  const sourceExists = await findSource(source.id);
  if (sourceExists) {
    return await deleteSourceById(source.id);
  }
}

export async function scrapeWebsite(url: string) {
  return await getArticleText(url);
}

export async function scrapeAllWebsites(urls: string[]) {
  return await Promise.all(urls.map(async (url) => await getArticleText(url)));
}
