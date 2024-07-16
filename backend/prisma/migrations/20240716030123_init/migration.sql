/*
  Warnings:

  - You are about to drop the column `verification_attempt` on the `registverification` table. All the data in the column will be lost.
  - Added the required column `verify_registration_token` to the `RegistVerification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `registverification` DROP COLUMN `verification_attempt`,
    ADD COLUMN `isUse` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `verify_registration_token` VARCHAR(191) NOT NULL;
