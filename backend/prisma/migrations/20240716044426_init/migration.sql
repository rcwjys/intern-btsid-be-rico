-- DropForeignKey
ALTER TABLE `user_verify_registrations` DROP FOREIGN KEY `user_verify_registrations_registration_id_fkey`;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_registration_id_fkey` FOREIGN KEY (`registration_id`) REFERENCES `user_verify_registrations`(`registration_id`) ON DELETE CASCADE ON UPDATE CASCADE;
