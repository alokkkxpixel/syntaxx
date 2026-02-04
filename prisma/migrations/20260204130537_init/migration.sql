/*
  Warnings:

  - Made the column `description` on table `Tech` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Tech` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CodeSnippet" ADD COLUMN     "icon" TEXT;

-- AlterTable
ALTER TABLE "Tech" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL;
