-- "session" definition

CREATE TABLE `session` (
                           `id` varchar(36) NOT NULL,
                           `expires_at` datetime NOT NULL,
                           `token` varchar(255) NOT NULL,
                           `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           `ip_address` text,
                           `user_agent` text,
                           `user_id` text NOT NULL,
                           PRIMARY KEY(`id`),
                           FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
                           UNIQUE(`token`)
);

CREATE INDEX `session_user_id_idx` ON `session` (`user_id`);