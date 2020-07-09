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
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT, 
   first_name VARCHAR (30),
   last_name VARCHAR (30),
   role_id INT,
   manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
 );

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 60000, 1), ("Sales Person", 40000, 1), ("Lead Engineer", 100000, 2), ("Software Engineer", 70000, 2), ("Account Manager", 50000, 1), ("Accountant", 60000, 3), ("Legal Team Lead", 150000, 4), ("Lawyer", 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Daryl", "Reedus",1,null), ("Rick", "Grimes",2,1), ("Negan", "Wilson",3,null), ("Carol", "Peletier",4,3), ("Maggie", "Green",5,1), ("Michonne", "Hawthorne",6,null), ("Eugene", "Porter",7,null), ("Rosita", "Espinosa",8,7);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

SELECT employee.id, employee.first_name AS first, employee.last_name AS last, role.title AS role, department.name AS department, role.salary, employee.manager_id
FROM employee
LEFT JOIN role 
ON employee.role_id = role.id
LEFT JOIN department 
ON role.department_id = department.id;


--Table should have the following columns:
--id, first_name, last_name, title, department, salary, manager
--Departments: Sales 1, Engineering 2, Finance 3, Legal 4
--Roles: Sales Lead 1, Salesperson 2, Lead Engineer 3, Software Engineer 4, Account Manager 5, Accountant 6, Legal Team Lead 7, Lawyer 8