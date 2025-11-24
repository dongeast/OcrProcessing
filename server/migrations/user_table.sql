-- "user" definition

CREATE TABLE `user` (
                        `id` varchar(36) NOT NULL,
                        `name` text NOT NULL,
                        `email` varchar(255) NOT NULL,
                        `email_verified` integer NOT NULL,
                        `image` text,
                        `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        `invite_code` varchar(8) NOT NULL, password_hash TEXT, first_name TEXT, last_name TEXT, is_verified INTEGER,
                        PRIMARY KEY(`id`),
                        UNIQUE(`email`)
);

CREATE INDEX `user_email_idx` ON `user` (`email`);