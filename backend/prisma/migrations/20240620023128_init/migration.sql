/*
  Warnings:

  - You are about to drop the column `author_email` on the `board` table. All the data in the column will be lost.
  - You are about to drop the column `author_email` on the `list` table. All the data in the column will be lost.
  - You are about to drop the column `author_email` on the `task` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[user_email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author_id` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `List` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `Task` table without a default value. This is not possible if the table is not empty.
  - The required column `user_id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `board` DROP FOREIGN KEY `Board_author_email_fkey`;

-- DropForeignKey
ALTER TABLE `list` DROP FOREIGN KEY `List_author_email_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_author_email_fkey`;

-- AlterTable
ALTER TABLE `board` DROP COLUMN `author_email`,
    ADD COLUMN `author_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `list` DROP COLUMN `author_email`,
    ADD COLUMN `author_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `author_email`,
    ADD COLUMN `author_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_user_email_key` ON `User`(`user_email`);

-- AddForeignKey
ALTER TABLE `Board` ADD CONSTRAINT `Board_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `List` ADD CONSTRAINT `List_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
