/*
  Warnings:

  - A unique constraint covering the columns `[registration_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `registration_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_verify_registrations` DROP FOREIGN KEY `user_verify_registrations_user_email_fkey`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `registration_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_registration_id_key` ON `users`(`registration_id`);

-- AddForeignKey
ALTER TABLE `user_verify_registrations` ADD CONSTRAINT `user_verify_registrations_registration_id_fkey` FOREIGN KEY (`registration_id`) REFERENCES `users`(`registration_id`) ON DELETE CASCADE ON UPDATE CASCADE;
