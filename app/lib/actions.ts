"use server";

import { getArticleText } from "@/app/lib/scraper";
import { prisma } from "@/app/db/prisma";
import { Source } from "@prisma/client";
import { createSource, deleteSourceById, findSource, updateSource } from "@/app/db/queries";

export const fetchFilteredArticles = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return await prisma.article.findMany({
    include: {
      _count: {
        select: { sources: true },
      },
    },
  });
};

export const createNews = async (prevState: unknown, formData: FormData) => {
  const articleTitle = formData.get("article-title") as string;
  const articleText = formData.get("article-text") as string;
  const sources: { url: string; text: string }[] = [];
  console.log(formData);

  // Iterate over sources cause their number is not known
  let i = 0;
  while (typeof formData.get(`url-${i}`) === "string") {
    sources.push({
      url: formData.get(`url-${i}`) as string,
      text: formData.get(`text-${i}`) as string,
    });
    i++;
  }

  try {
    const article = await prisma.article.create({
      data: {
        title: articleTitle,
        text: articleText,
        sources: {
          create: sources,
        },
      },
    });
    console.log("TEST");
  } catch (error) {
    console.error(error);
  }

  // redirect("/admin");
};

export async function saveSource(source: Source) {
  const existingSource = await findSource(source.id);
  if (existingSource) {
    return await updateSource(source);
  } else {
    return await createSource(source);
  }
}

export async function deleteSource(source: Source) {
  const existingSource = await findSource(source.id);
  if (existingSource) {
    return await deleteSourceById(source.id);
  }
}

export async function scrapeWebsite(url: string) {
  return await getArticleText(url);
}

export async function scrapeAllWebsites(urls: string[]) {
  return await Promise.all(urls.map(async (url) => await getArticleText(url)));
}
