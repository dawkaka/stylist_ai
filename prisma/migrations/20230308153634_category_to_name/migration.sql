/*
  Warnings:

  - You are about to drop the column `category` on the `Clothes` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `Clothes` table. All the data in the column will be lost.
  - Added the required column `name` to the `Clothes` table without a default value. This is not possible if the table is not empty.
  - Made the column `brand` on table `Clothes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `Clothes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Clothes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Clothes` DROP COLUMN `category`,
    DROP COLUMN `season`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    MODIFY `brand` VARCHAR(191) NOT NULL,
    MODIFY `size` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;
