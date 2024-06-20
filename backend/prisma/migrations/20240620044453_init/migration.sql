/*
  Warnings:

  - A unique constraint covering the columns `[board_title]` on the table `Board` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[list_title]` on the table `List` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[task_title]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Board_board_title_key` ON `Board`(`board_title`);

-- CreateIndex
CREATE UNIQUE INDEX `List_list_title_key` ON `List`(`list_title`);

-- CreateIndex
CREATE UNIQUE INDEX `Task_task_title_key` ON `Task`(`task_title`);
