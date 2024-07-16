/*
  Warnings:

  - You are about to drop the `resetpassword` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verifyregistration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `resetpassword` DROP FOREIGN KEY `ResetPassword_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `verifyregistration` DROP FOREIGN KEY `VerifyRegistration_registration_id_fkey`;

-- DropTable
DROP TABLE `resetpassword`;

-- DropTable
DROP TABLE `verifyregistration`;

-- CreateTable
CREATE TABLE `user_reset_passwords` (
    `id` VARCHAR(191) NOT NULL,
    `token_reset` VARCHAR(191) NOT NULL,
    `expiresAt` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isUse` BOOLEAN NOT NULL DEFAULT false,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_verify_registration` (
    `registration_id` VARCHAR(191) NOT NULL,
    `user_email` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `user_password` VARCHAR(191) NOT NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `registration_token` VARCHAR(191) NOT NULL,
    `expiredAt` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_verify_registration_user_email_key`(`user_email`),
    PRIMARY KEY (`registration_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_reset_passwords` ADD CONSTRAINT `user_reset_passwords_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_verify_registration` ADD CONSTRAINT `user_verify_registration_registration_id_fkey` FOREIGN KEY (`registration_id`) REFERENCES `users`(`registration_id`) ON DELETE CASCADE ON UPDATE CASCADE;
