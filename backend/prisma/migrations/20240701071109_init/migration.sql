/*
  Warnings:

  - You are about to drop the `share` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `share` DROP FOREIGN KEY `Share_collaborator_id_fkey`;

-- DropTable
DROP TABLE `share`;

-- CreateTable
CREATE TABLE `Sharing` (
    `share_id` VARCHAR(191) NOT NULL,
    `author_id` VARCHAR(191) NOT NULL,
    `collaborator_id` VARCHAR(191) NOT NULL,
    `board_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`share_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sharing` ADD CONSTRAINT `Sharing_collaborator_id_fkey` FOREIGN KEY (`collaborator_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sharing` ADD CONSTRAINT `Sharing_board_id_fkey` FOREIGN KEY (`board_id`) REFERENCES `Board`(`board_id`) ON DELETE CASCADE ON UPDATE CASCADE;
