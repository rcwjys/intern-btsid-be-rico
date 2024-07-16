/*
  Warnings:

  - You are about to drop the column `user_email` on the `registverification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registration_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `registration_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `registverification` DROP FOREIGN KEY `RegistVerification_user_email_fkey`;

-- AlterTable
ALTER TABLE `registverification` DROP COLUMN `user_email`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `registration_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_registration_id_key` ON `users`(`registration_id`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_registration_id_fkey` FOREIGN KEY (`registration_id`) REFERENCES `RegistVerification`(`registration_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
