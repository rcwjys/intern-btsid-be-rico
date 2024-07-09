/*
  Warnings:

  - You are about to drop the `board` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `list` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sharing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `board` DROP FOREIGN KEY `Board_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `list` DROP FOREIGN KEY `List_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `list` DROP FOREIGN KEY `List_board_id_fkey`;

-- DropForeignKey
ALTER TABLE `resetpassword` DROP FOREIGN KEY `ResetPassword_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `sharing` DROP FOREIGN KEY `Sharing_board_id_fkey`;

-- DropForeignKey
ALTER TABLE `sharing` DROP FOREIGN KEY `Sharing_collaborator_id_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_list_id_fkey`;

-- DropTable
DROP TABLE `board`;

-- DropTable
DROP TABLE `list`;

-- DropTable
DROP TABLE `sharing`;

-- DropTable
DROP TABLE `task`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `users` (
    `user_id` VARCHAR(191) NOT NULL,
    `user_email` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `user_password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_user_email_key`(`user_email`),
    INDEX `users_user_id_user_email_idx`(`user_id`, `user_email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `boards` (
    `board_id` VARCHAR(191) NOT NULL,
    `board_title` VARCHAR(191) NOT NULL,
    `is_sharing` BOOLEAN NOT NULL DEFAULT false,
    `board_slug` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `author_id` VARCHAR(191) NOT NULL,

    INDEX `boards_board_id_idx`(`board_id`),
    PRIMARY KEY (`board_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lists` (
    `list_id` VARCHAR(191) NOT NULL,
    `list_title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `author_id` VARCHAR(191) NOT NULL,
    `board_id` VARCHAR(191) NOT NULL,

    INDEX `lists_list_id_idx`(`list_id`),
    PRIMARY KEY (`list_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tasks` (
    `task_id` VARCHAR(191) NOT NULL,
    `task_title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `author_id` VARCHAR(191) NOT NULL,
    `list_id` VARCHAR(191) NOT NULL,

    INDEX `tasks_task_id_idx`(`task_id`),
    PRIMARY KEY (`task_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shares` (
    `share_id` VARCHAR(191) NOT NULL,
    `author_id` VARCHAR(191) NOT NULL,
    `collaborator_id` VARCHAR(191) NOT NULL,
    `board_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`share_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `boards` ADD CONSTRAINT `boards_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lists` ADD CONSTRAINT `lists_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lists` ADD CONSTRAINT `lists_board_id_fkey` FOREIGN KEY (`board_id`) REFERENCES `boards`(`board_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_list_id_fkey` FOREIGN KEY (`list_id`) REFERENCES `lists`(`list_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shares` ADD CONSTRAINT `shares_collaborator_id_fkey` FOREIGN KEY (`collaborator_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shares` ADD CONSTRAINT `shares_board_id_fkey` FOREIGN KEY (`board_id`) REFERENCES `boards`(`board_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResetPassword` ADD CONSTRAINT `ResetPassword_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
