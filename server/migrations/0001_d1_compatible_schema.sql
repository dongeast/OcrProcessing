-- D1/SQLite兼容的数据库模式迁移文件

CREATE TABLE IF NOT EXISTS `account` (
	`id` TEXT NOT NULL,
	`account_id` TEXT NOT NULL,
	`provider_id` TEXT NOT NULL,
	`user_id` TEXT NOT NULL,
	`access_token` TEXT,
	`refresh_token` TEXT,
	`id_token` TEXT,
	`access_token_expires_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`refresh_token_expires_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`scope` TEXT,
	`password` TEXT,
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `session` (
	`id` TEXT NOT NULL,
	`expires_at` TIMESTAMP NOT NULL,
	`token` TEXT NOT NULL,
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`ip_address` TEXT,
	`user_agent` TEXT,
	`user_id` TEXT NOT NULL,
	PRIMARY KEY(`id`),
	UNIQUE(`token`)
);

CREATE TABLE IF NOT EXISTS `user` (
	`id` TEXT NOT NULL,
	`name` TEXT NOT NULL,
	`email` TEXT NOT NULL,
	`email_verified` INTEGER NOT NULL DEFAULT 0,
	`image` TEXT,
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`invite_code` TEXT NOT NULL,
	PRIMARY KEY(`id`),
	UNIQUE(`email`)
);

CREATE TABLE IF NOT EXISTS `verification` (
	`id` TEXT NOT NULL,
	`email` TEXT NOT NULL DEFAULT '',
	`identifier` TEXT NOT NULL,
	`token` TEXT NOT NULL DEFAULT '',
	`value` TEXT NOT NULL,
	`expires_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(`id`)
);

-- 添加外键约束（如果需要）
CREATE INDEX IF NOT EXISTS `idx_account_user_id` ON `account` (`user_id`);
CREATE INDEX IF NOT EXISTS `idx_session_user_id` ON `session` (`user_id`);