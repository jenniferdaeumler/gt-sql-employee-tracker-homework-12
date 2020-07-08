DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id INT AUTO_INCREMENT,
    name VARCHAR (30),
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT,
    title VARCHAR (30),
    salary DECIMAL,
    department_id INT,
     PRIMARY KEY (id)
);

CREATE TABLE employee(
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);




INSERT INTO songs (title, artist, genre)
VALUES ("Sweet Home Alabama", "Lynyrd Skynrd", "Southern Rock");


INSERT INTO songs (title, artist, genre)
VALUES ("Oops I Did It Again", "Britney Spears", "Pop");


INSERT INTO songs (title, artist, genre)
VALUES ("Thunder Rolls", "Garth Brooks", "Country");

SELECT * FROM songs
--Only songs from beatles?
WHERE arist = "Beatles";


--Table should have the following columns:
--id, first_name, last_name, title, department, salary, manager