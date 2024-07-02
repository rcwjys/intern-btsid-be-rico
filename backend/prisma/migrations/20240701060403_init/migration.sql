/*
  Warnings:

  - You are about to drop the column `board_id` on the `share` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `share` DROP FOREIGN KEY `Share_board_id_fkey`;

-- AlterTable
ALTER TABLE `share` DROP COLUMN `board_id`;
