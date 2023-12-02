/*
  Warnings:

  - You are about to drop the column `priorty` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "priorty",
ADD COLUMN     "priority" "TaskPriority" NOT NULL DEFAULT 'LOW';
