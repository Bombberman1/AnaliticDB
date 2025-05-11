USE `analitic_db`;

ALTER TABLE `analitic_db`.`facts`
ADD PRIMARY KEY (`id`);

ALTER TABLE `analitic_db`.`employee_dim`
ADD PRIMARY KEY (`id`);

ALTER TABLE `analitic_db`.`mentor_dim`
ADD PRIMARY KEY (`id`);

ALTER TABLE `analitic_db`.`position_dim`
ADD PRIMARY KEY (`id`);

ALTER TABLE `analitic_db`.`feedback_dim`
ADD PRIMARY KEY (`id`);

ALTER TABLE `analitic_db`.`time_dim`
ADD PRIMARY KEY (`id`);

ALTER TABLE `analitic_db`.`facts`
ADD CONSTRAINT `employee_fk`
	FOREIGN KEY (`employee_id`)
    REFERENCES `analitic_db`.`employee_dim` (`id`);

ALTER TABLE `analitic_db`.`facts`
ADD CONSTRAINT `mentor_fk`
	FOREIGN KEY (`mentor_id`)
    REFERENCES `analitic_db`.`mentor_dim` (`id`);

ALTER TABLE `analitic_db`.`facts`
ADD CONSTRAINT `position_fk`
	FOREIGN KEY (`position_id`)
    REFERENCES `analitic_db`.`position_dim` (`id`);

ALTER TABLE `analitic_db`.`facts`
ADD CONSTRAINT `feedback_fk`
	FOREIGN KEY (`feedback_id`)
    REFERENCES `analitic_db`.`feedback_dim` (`id`);

ALTER TABLE `analitic_db`.`facts`
ADD CONSTRAINT `time_fk`
	FOREIGN KEY (`time_id`)
    REFERENCES `analitic_db`.`time_dim` (`id`);
