-- CreateTable
CREATE TABLE `User` (
    `user_email` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `user_password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`user_email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Board` (
    `board_id` VARCHAR(191) NOT NULL,
    `board_title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `author_email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`board_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `List` (
    `list_id` VARCHAR(191) NOT NULL,
    `list_title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `author_email` VARCHAR(191) NOT NULL,
    `board_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`list_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `task_id` VARCHAR(191) NOT NULL,
    `task_title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `author_email` VARCHAR(191) NOT NULL,
    `list_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`task_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Board` ADD CONSTRAINT `Board_author_email_fkey` FOREIGN KEY (`author_email`) REFERENCES `User`(`user_email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `List` ADD CONSTRAINT `List_author_email_fkey` FOREIGN KEY (`author_email`) REFERENCES `User`(`user_email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `List` ADD CONSTRAINT `List_board_id_fkey` FOREIGN KEY (`board_id`) REFERENCES `Board`(`board_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_author_email_fkey` FOREIGN KEY (`author_email`) REFERENCES `User`(`user_email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_list_id_fkey` FOREIGN KEY (`list_id`) REFERENCES `List`(`list_id`) ON DELETE CASCADE ON UPDATE CASCADE;
