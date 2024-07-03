/*
  Warnings:

  - You are about to drop the column `token_reste` on the `resetpassword` table. All the data in the column will be lost.
  - Added the required column `token_reset` to the `ResetPassword` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `resetpassword` DROP COLUMN `token_reste`,
    ADD COLUMN `token_reset` VARCHAR(191) NOT NULL;
