-- verification definition

CREATE TABLE `verification` (
                                `id` TEXT NOT NULL,
                                `email` TEXT NOT NULL,
                                `identifier` TEXT NOT NULL,
                                `token` TEXT NOT NULL,
                                `value` TEXT,
                                `expires_at` TIMESTAMP NOT NULL,
                                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                PRIMARY KEY(`id`)
);