-- MySQL Workbench Synchronization
-- Generated: 2023-04-12 03:46
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

ALTER TABLE `ATC_DB`.`admin` 
DROP FOREIGN KEY `admin_ibfk_1`;

ALTER TABLE `ATC_DB`.`calculet_info` 
DROP INDEX `title_FULLTEXT` ,
ADD FULLTEXT INDEX `title_FULLTEXT` (`title`);
;

ALTER TABLE `ATC_DB`.`user_info` 
CHARACTER SET = DEFAULT , COLLATE = DEFAULT ;

ALTER TABLE `ATC_DB`.`calculet_update_log` 
CHANGE COLUMN `id` `id` CHAR(36) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' UNIQUE NOT NULL ,
DROP INDEX `id` ;
;

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

ALTER TABLE `ATC_DB`.`admin` 
ADD CONSTRAINT `admin_ibfk_1`
  FOREIGN KEY (`id` , `email`)
  REFERENCES `ATC_DB`.`user_info` (`id` , `email`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;


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
