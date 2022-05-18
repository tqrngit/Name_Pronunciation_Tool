
CREATE TABLE `client` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`first_name` VARCHAR(100),
	`last_name` VARCHAR(100),
	`uid` VARCHAR(50),
	`preferred_name` VARCHAR(200),
	`phonetics` VARCHAR(100),
	`pronunciation` VARCHAR(90),
	`languages` VARCHAR(70),
	`gender` VARCHAR(10),
	`speed` VARCHAR(50),
	`base64Audio` LONGBLOB
);