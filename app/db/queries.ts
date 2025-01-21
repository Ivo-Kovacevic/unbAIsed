import { Source } from "@prisma/client";
import { prisma } from "./prisma";

export async function createSource(source: Source) {
  return await prisma.source.create({
    data: {
      url: source.url,
      text: source.text,
      articleId: source.articleId,
    },
  });
}

export async function findSource(id: string) {
  return await prisma.source.findUnique({
    where: { id },
  });
}

export async function updateSource(source: Source) {
  return await prisma.source.update({
    where: { id: source.id },
    data: {
      url: source.url,
      text: source.text,
    },
  });
}

export async function deleteSourceById(id: string) {
  return await prisma.source.delete({
    where: { id },
  });
}
