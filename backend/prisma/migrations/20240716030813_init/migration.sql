/*
  Warnings:

  - You are about to drop the column `registration_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `registverification` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `verify_registration_token` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_registration_id_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `registration_id`,
    ADD COLUMN `verify_registration_token` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `registverification`;
