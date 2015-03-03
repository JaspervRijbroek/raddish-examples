CREATE TABLE `todo_items` (
	`todo_item_id` bigint UNSIGNED AUTO_INCREMENT,
	`title` varchar(255) NOT NULL,
	`done` tinyint(1) UNSIGNED NOT NULL,
	`created_on` datetime NOT NULL,
	`modified_on` datetime NOT NULL,
	PRIMARY KEY (`todo_item_id`)
);