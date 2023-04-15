-- MySQL Workbench Synchronization
-- Generated: 2023-04-12 02:33
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: BaeSuA

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

ALTER TABLE `ATC_DB`.`calculet_info` 
DROP FOREIGN KEY `calculet_info_ibfk_2`;

ALTER TABLE `ATC_DB`.`calculet_info_temp` 
DROP FOREIGN KEY `calculet_info_temp_ibfk_2`;

ALTER TABLE `ATC_DB`.`calculet_record` 
DROP FOREIGN KEY `calculet_record_ibfk_1`;

ALTER TABLE `ATC_DB`.`category` 
DROP FOREIGN KEY `category_ibfk_1`,
DROP FOREIGN KEY `category_ibfk_2`;

ALTER TABLE `ATC_DB`.`calculet_info` 
DROP INDEX `title_FULLTEXT` ,
ADD FULLTEXT INDEX `title_FULLTEXT` (`title`);
;

ALTER TABLE `ATC_DB`.`user_info` 
CHARACTER SET = DEFAULT , COLLATE = DEFAULT ,
ADD INDEX `id_email` (`id` ASC, `email` ASC);
;

ALTER TABLE `ATC_DB`.`calculet_update_log` 
CHANGE COLUMN `id` `id` CHAR(36) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' UNIQUE NOT NULL ,
DROP INDEX `id` ;
;

CREATE TABLE IF NOT EXISTS `ATC_DB`.`admin` (
  `id` VARCHAR(36) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL,
  `email` VARCHAR(254) NOT NULL,
  `access_level` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `admin_ibfk_1_idx` (`id` ASC, `email` ASC),
  CONSTRAINT `admin_ibfk_1`
    FOREIGN KEY (`id` , `email`)
    REFERENCES `ATC_DB`.`user_info` (`id` , `email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

ALTER TABLE `ATC_DB`.`calculet_info` 
ADD CONSTRAINT `calculet_info_ibfk_2`
  FOREIGN KEY (`category_main_id` , `category_sub_id`)
  REFERENCES `ATC_DB`.`category` (`main_id` , `sub_id`)
  ON DELETE RESTRICT
  ON UPDATE NO ACTION;

ALTER TABLE `ATC_DB`.`calculet_info_temp` 
ADD CONSTRAINT `calculet_info_temp_ibfk_2`
  FOREIGN KEY (`category_main_id` , `category_sub_id`)
  REFERENCES `ATC_DB`.`category` (`main_id` , `sub_id`)
  ON DELETE RESTRICT
  ON UPDATE NO ACTION;

ALTER TABLE `ATC_DB`.`calculet_record` 
ADD CONSTRAINT `calculet_record_ibfk_1`
  FOREIGN KEY (`calculet_id`)
  REFERENCES `ATC_DB`.`calculet_info` (`id`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION;

ALTER TABLE `ATC_DB`.`category` 
ADD CONSTRAINT `category_ibfk_1`
  FOREIGN KEY (`main_id`)
  REFERENCES `ATC_DB`.`category_main` (`id`)
  ON DELETE RESTRICT
  ON UPDATE NO ACTION,
ADD CONSTRAINT `category_ibfk_2`
  FOREIGN KEY (`sub_id`)
  REFERENCES `ATC_DB`.`category_sub` (`id`)
  ON DELETE RESTRICT
  ON UPDATE NO ACTION;


DELIMITER $$

USE `ATC_DB`$$
DROP TRIGGER IF EXISTS `ATC_DB`.`calculet_info_temp_BEFORE_INSERT` $$

USE `ATC_DB`$$
CREATE DEFINER = CURRENT_USER TRIGGER `ATC_DB`.`calculet_info_temp_BEFORE_INSERT` BEFORE INSERT ON `calculet_info_temp` FOR EACH ROW
BEGIN
	IF NEW.id is NULL OR NEW.id = '' THEN
		SET NEW.id = uuid();
    END IF;
END$$

USE `ATC_DB`$$
DROP TRIGGER IF EXISTS `ATC_DB`.`calculet_record_BEFORE_INSERT` $$

USE `ATC_DB`$$
CREATE DEFINER = CURRENT_USER TRIGGER `ATC_DB`.`calculet_record_BEFORE_INSERT` BEFORE INSERT ON `calculet_record` FOR EACH ROW
BEGIN
	IF NEW.id is NULL OR NEW.id = '' THEN
		SET NEW.id = uuid();
    END IF;
END$$

USE `ATC_DB`$$
DROP TRIGGER IF EXISTS `ATC_DB`.`calculet_update_log_BEFORE_INSERT` $$

USE `ATC_DB`$$
CREATE DEFINER = CURRENT_USER TRIGGER `ATC_DB`.`calculet_update_log_BEFORE_INSERT` BEFORE INSERT ON `calculet_update_log` FOR EACH ROW
BEGIN
	IF NEW.id is NULL OR NEW.id = '' THEN
		SET NEW.id = uuid();
    END IF;
END$$


DELIMITER ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
