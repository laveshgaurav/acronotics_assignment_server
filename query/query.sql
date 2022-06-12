CREATE TABLE Teacher(
    t_id INT NOT NULL AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL,
    class VARCHAR(255) NOT NULL,
    p_id INT,
    FOREIGN KEY (p_id) REFERENCES Principal(p_id),
    PRIMARY KEY (t_id)
);

CREATE TABLE Principal(
    p_id INT NOT NULL AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,`teacher`
    `role` VARCHAR(255) NOT NULL,
    PRIMARY KEY (p_id)
);