/*
  Warnings:

  - You are about to drop the column `registration_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_verify_registrations` DROP FOREIGN KEY `user_verify_registrations_registration_id_fkey`;

-- DropIndex
DROP INDEX `users_registration_id_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `registration_id`;

-- AddForeignKey
ALTER TABLE `user_verify_registrations` ADD CONSTRAINT `user_verify_registrations_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `users`(`user_email`) ON DELETE CASCADE ON UPDATE CASCADE;
