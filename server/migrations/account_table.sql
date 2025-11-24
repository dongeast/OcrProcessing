-- account definition

CREATE TABLE `account` (
                           `id` varchar(36) NOT NULL,
                           `account_id` text NOT NULL,
                           `provider_id` text NOT NULL,
                           `user_id` text NOT NULL,
                           `access_token` text,
                           `refresh_token` text,
                           `id_token` text,
                           `access_token_expires_at` datetime DEFAULT CURRENT_TIMESTAMP,
                           `refresh_token_expires_at` datetime DEFAULT CURRENT_TIMESTAMP,
                           `scope` text,
                           `password` text,
                           `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           PRIMARY KEY(`id`),
                           FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX `account_user_id_idx` ON `account` (`user_id`);