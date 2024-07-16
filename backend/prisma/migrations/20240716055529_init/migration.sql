/*
  Warnings:

  - A unique constraint covering the columns `[registration_token]` on the table `user_verify_registrations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_verify_registrations_registration_token_key` ON `user_verify_registrations`(`registration_token`);
