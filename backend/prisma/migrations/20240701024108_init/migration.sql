/*
  Warnings:

  - Added the required column `board_slug` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `board` ADD COLUMN `board_slug` VARCHAR(191) NOT NULL;
