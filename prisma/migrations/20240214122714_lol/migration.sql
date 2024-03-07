/*
  Warnings:

  - You are about to drop the `booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `receipt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `table` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `type_table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_table_id_fkey`;

-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_booking_id_fkey`;

-- DropForeignKey
ALTER TABLE `receipt` DROP FOREIGN KEY `Receipt_payment_id_fkey`;

-- DropForeignKey
ALTER TABLE `receipt` DROP FOREIGN KEY `Receipt_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `table` DROP FOREIGN KEY `Table_type_id_fkey`;

-- DropTable
DROP TABLE `booking`;

-- DropTable
DROP TABLE `payment`;

-- DropTable
DROP TABLE `receipt`;

-- DropTable
DROP TABLE `table`;

-- DropTable
DROP TABLE `type_table`;

-- CreateTable
CREATE TABLE `bookings` (
    `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_name` VARCHAR(191) NOT NULL,
    `booking_datatime` DATETIME(3) NOT NULL,
    `booking_phone` VARCHAR(10) NOT NULL,
    `table_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `payment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_methon` VARCHAR(191) NOT NULL,
    `payment_amount` VARCHAR(191) NOT NULL,
    `payment_status` ENUM('UNPAID', 'PAID') NOT NULL DEFAULT 'UNPAID',
    `booking_id` INTEGER NOT NULL,

    PRIMARY KEY (`payment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `receipts` (
    `receip_id` INTEGER NOT NULL AUTO_INCREMENT,
    `receip_datatime` DATETIME(3) NOT NULL,
    `total_amount` INTEGER NOT NULL,
    `payment_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`receip_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tables` (
    `table_id` INTEGER NOT NULL AUTO_INCREMENT,
    `table_img` VARCHAR(191) NOT NULL,
    `table_name` VARCHAR(50) NOT NULL,
    `table_status` ENUM('FREE', 'BUSY') NOT NULL DEFAULT 'FREE',
    `table_price` INTEGER NOT NULL,
    `type_id` INTEGER NOT NULL,

    PRIMARY KEY (`table_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `types` (
    `type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_table_id_fkey` FOREIGN KEY (`table_id`) REFERENCES `tables`(`table_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`booking_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receipts` ADD CONSTRAINT `receipts_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `payments`(`payment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receipts` ADD CONSTRAINT `receipts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tables` ADD CONSTRAINT `tables_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `types`(`type_id`) ON DELETE CASCADE ON UPDATE CASCADE;
