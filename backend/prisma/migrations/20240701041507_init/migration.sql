-- CreateTable
CREATE TABLE `Share` (
    `share_id` VARCHAR(191) NOT NULL,
    `shared_board` VARCHAR(191) NOT NULL,
    `collaborator_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`share_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Share` ADD CONSTRAINT `Share_collaborator_id_fkey` FOREIGN KEY (`collaborator_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
