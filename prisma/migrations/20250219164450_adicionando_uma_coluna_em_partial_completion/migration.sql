/*
  Warnings:

  - Added the required column `completed` to the `PartialCompletion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PartialCompletion" ADD COLUMN     "completed" BOOLEAN NOT NULL;
