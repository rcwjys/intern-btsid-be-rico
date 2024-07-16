/*
  Warnings:

  - You are about to drop the `user_verify_registration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_verify_registration` DROP FOREIGN KEY `user_verify_registration_registration_id_fkey`;

-- DropTable
DROP TABLE `user_verify_registration`;

-- CreateTable
CREATE TABLE `user_verify_registrations` (
    `registration_id` VARCHAR(191) NOT NULL,
    `user_email` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `user_password` VARCHAR(191) NOT NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `registration_token` VARCHAR(191) NOT NULL,
    `expiredAt` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_verify_registrations_user_email_key`(`user_email`),
    PRIMARY KEY (`registration_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_verify_registrations` ADD CONSTRAINT `user_verify_registrations_registration_id_fkey` FOREIGN KEY (`registration_id`) REFERENCES `users`(`registration_id`) ON DELETE CASCADE ON UPDATE CASCADE;
