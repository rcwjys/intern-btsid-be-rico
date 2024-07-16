/*
  Warnings:

  - You are about to drop the column `expiredAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_verify` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verify_registration_token` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registration_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `registration_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `users_verify_registration_token_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `expiredAt`,
    DROP COLUMN `is_verify`,
    DROP COLUMN `verify_registration_token`,
    ADD COLUMN `registration_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `VerifyRegistration` (
    `registration_id` VARCHAR(191) NOT NULL,
    `user_email` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `user_password` VARCHAR(191) NOT NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `registration_token` VARCHAR(191) NOT NULL,
    `expiredAt` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `VerifyRegistration_user_email_key`(`user_email`),
    PRIMARY KEY (`registration_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_registration_id_key` ON `users`(`registration_id`);

-- AddForeignKey
ALTER TABLE `VerifyRegistration` ADD CONSTRAINT `VerifyRegistration_registration_id_fkey` FOREIGN KEY (`registration_id`) REFERENCES `users`(`registration_id`) ON DELETE CASCADE ON UPDATE CASCADE;
