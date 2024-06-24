/*
  Warnings:

  - You are about to drop the column `board_id` on the `task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_board_id_fkey`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `board_id`;
