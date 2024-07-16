-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_registration_id_fkey`;

-- AddForeignKey
ALTER TABLE `user_verify_registrations` ADD CONSTRAINT `user_verify_registrations_registration_id_fkey` FOREIGN KEY (`registration_id`) REFERENCES `users`(`registration_id`) ON DELETE CASCADE ON UPDATE CASCADE;
