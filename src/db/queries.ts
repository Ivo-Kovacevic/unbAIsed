import { Source, Status } from "@prisma/client";
import { prisma } from "./prisma";

export async function createSource(url: string, text: string, articleId: string) {
  return await prisma.source.create({
    data: {
      url,
      text,
      articleId,
    },
  });
}

export async function createArticle(title: string, text: string) {
  return await prisma.article.create({
    data: {
      title,
      text,
    },
  });
}

export async function updateArticle(id: string, title: string, text: string, status: Status) {
  return await prisma.article.update({
    where: { id },
    data: {
      title,
      text,
      status,
    },
  });
}

export async function findSource(id: string) {
  return await prisma.source.findUnique({
    where: { id },
  });
}

export async function findArticleById(id: string) {
  return await prisma.article.findUnique({
    where: { id },
  });
}

export async function findSourcesByArticleId(articleId: string) {
  return await prisma.source.findMany({
    where: { articleId },
  });
}

export async function updateSource(id: string, url: string, text: string) {
  return await prisma.source.update({
    where: { id },
    data: {
      url,
      text,
    },
  });
}

export async function deleteSourceById(id: string) {
  return await prisma.source.delete({
    where: { id },
  });
}
