/*
  Warnings:

  - Made the column `title` on table `CodeSnippet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `icon` on table `CodeSnippet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CodeSnippet" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "icon" SET NOT NULL;
