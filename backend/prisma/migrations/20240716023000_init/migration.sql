-- CreateTable
CREATE TABLE `RegistVerification` (
    `registration_id` VARCHAR(191) NOT NULL,
    `expiredAt` VARCHAR(191) NOT NULL,
    `verification_attempt` INTEGER NOT NULL DEFAULT 1,
    `user_email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RegistVerification_user_email_key`(`user_email`),
    PRIMARY KEY (`registration_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RegistVerification` ADD CONSTRAINT `RegistVerification_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `users`(`user_email`) ON DELETE RESTRICT ON UPDATE CASCADE;
