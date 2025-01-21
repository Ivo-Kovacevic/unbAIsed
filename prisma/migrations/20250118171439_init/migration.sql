/*
  Warnings:

  - You are about to drop the column `content` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Source` table. All the data in the column will be lost.
  - Added the required column `text` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Source` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "content",
ADD COLUMN     "text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Source" DROP COLUMN "content",
ADD COLUMN     "text" TEXT NOT NULL;
