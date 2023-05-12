-- MySQL Workbench Synchronization
-- Generated: 2023-05-06 12:06
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: BaeSuA

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

ALTER TABLE `ATC_DB`.`calculet_info_temp` 
ADD COLUMN `calculet_id` CHAR(36) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL AFTER `type`;

DROP TRIGGER calculet_info_temp_BEFORE_INSERT;

DELIMITER $$

USE `ATC_DB`$$
CREATE DEFINER = CURRENT_USER TRIGGER `ATC_DB`.`calculet_info_temp_BEFORE_INSERT` BEFORE INSERT ON `calculet_info_temp` FOR EACH ROW
BEGIN
	IF NEW.id is NULL OR NEW.id = '' THEN
		SET NEW.id = uuid();
    END IF;
    IF NEW.calculet_id is NULL OR NEW.calculet_id = '' THEN
		SET NEW.calculet_id = uuid();
    END IF;
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

SET SQL_SAFE_UPDATES = 0;  # disable safe mode
UPDATE calculet_info_temp SET calculet_id = id;
SET SQL_SAFE_UPDATES = 1;  # enable safe mode

ALTER TABLE `ATC_DB`.`calculet_info_temp` 
ADD UNIQUE INDEX `calculet_id_UNIQUE` (`calculet_id` ASC) VISIBLE;