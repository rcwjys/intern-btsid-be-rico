/*
  Warnings:

  - Added the required column `board_id` to the `Share` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `share` ADD COLUMN `board_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Share` ADD CONSTRAINT `Share_board_id_fkey` FOREIGN KEY (`board_id`) REFERENCES `Board`(`board_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
