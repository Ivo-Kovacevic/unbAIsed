import { prisma } from "@/app/db/prisma";

export const fetchArticleByTitle = async (title: string) => {
  return await prisma.article.findFirst({
    where: {
      title: title,
    },
    include: {
      sources: true,
    },
  });
};

export const fetchSources = async (title: string) => {
  return await prisma.article.findFirst({
    where: {
      title: title,
    },
    select: {
      sources: true,
    },
  });
};
