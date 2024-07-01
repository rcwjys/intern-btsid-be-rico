/*
  Warnings:

  - A unique constraint covering the columns `[board_slug]` on the table `Board` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Board_board_slug_key` ON `Board`(`board_slug`);
