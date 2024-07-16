/*
  Warnings:

  - Added the required column `is_verified` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_verify_registrations` DROP FOREIGN KEY `user_verify_registrations_registration_id_fkey`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `is_verified` BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_registration_id_fkey` FOREIGN KEY (`registration_id`) REFERENCES `user_verify_registrations`(`registration_id`) ON DELETE CASCADE ON UPDATE CASCADE;
