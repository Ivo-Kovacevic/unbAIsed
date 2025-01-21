import { prisma } from "@/app/db/prisma";

export const fetchArticleByTitle = async (title: string) => {
  return await prisma.article.findFirst({
    where: {
      title: title,
    },
    include: {
      sources: {
        orderBy: { createdAt : "asc" }
      },
    },
  });
};
