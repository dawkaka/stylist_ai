/*
  Warnings:

  - You are about to drop the column `name` on the `Clothes` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Clothes` table. All the data in the column will be lost.
  - Added the required column `fit` to the `Clothes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Clothes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Clothes` DROP COLUMN `name`,
    DROP COLUMN `size`,
    ADD COLUMN `fit` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
