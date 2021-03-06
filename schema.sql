
--View all employees table
SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) as "Employee", 
role.title AS Role, department.name AS Department, role.salary AS Salary, CONCAT(manager.first_name, " ", manager.last_name) as "Manager Name",employee.manager_id AS "Manager ID"
FROM employee
LEFT JOIN role 
ON employee.role_id = role.id
LEFT JOIN department 
ON role.department_id = department.id
LEFT JOIN employee manager 
  ON employee.manager_id = manager.id
ORDER BY department DESC;

--View employees by department table
SELECT department.name AS department, CONCAT(employee.first_name, " ", employee.last_name) as "Employee" , employee.id
FROM employee
LEFT JOIN role 
ON employee.role_id = role.id
LEFT JOIN department 
ON role.department_id = department.id
ORDER BY department.name DESC;

--View employees by manager table
 SELECT employee.manager_id AS "Manager ID",
CONCAT(manager.first_name, " ", manager.last_name) as "Manager Name",
 employee.id AS "Employee ID",
 CONCAT(employee.first_name, " ", employee.last_name) as "Employee"
  FROM employee employee
  LEFT JOIN employee manager 
  ON employee.manager_id = manager.id
  WHERE employee.manager_id IS NOT NULL
  ORDER BY "Manager Name" DESC;
  

--Manager list when not null
SELECT employee.manager_id
FROM employee
WHERE employee.manager_id IS NOT NULL;
--this one better -->
SELECT employee.manager_id AS "Manager ID",
  CONCAT(manager.first_name, " ", manager.last_name) as "Manager Name",
   employee.id AS "Employee ID",
   CONCAT(employee.first_name, " ", employee.last_name) as "Employee"
    FROM employee employee
    LEFT JOIN employee manager 
    ON employee.manager_id = manager.id
    WHERE employee.manager_id IS NOT NULL
    ORDER BY "Manager Name" DESC;

--New employee, replcae all values with ?
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Judith","Grimes",2,1);

--DELETE employee sql
DELETE FROM employee 
WHERE employee.id = ?;


--Table should have the following columns:
--id, first_name, last_name, title, department, salary, manager
--Departments: Sales 1, Engineering 2, Finance 3, Legal 4
--Roles: Sales Lead 1, Salesperson 2, Lead Engineer 3, Software Engineer 4, Account Manager 5, Accountant 6, Legal Team Lead 7, Lawyer 8

-- **Q: What would you like to do? O:View All Employees, View All Employees by Department, View All Employees by Manager,Add Employee, Remove Employee, Update Employee Role, Update Employee Manager
-- Add Employee Questions--> What is the employee's first name? What is the employee's last name? What is the employee's role? (List of options: Sales Lead, Salesperson, Lead Engineer, Software Engineer, Account Manager, Accountant, Legal Team Lead, Lawyer) Who is the employee's manager? (List of manager options from DB)
-- Remove Employee Questions: --> Which employee do you wish to remove? (List of employees from DB)
-- Update Employee Manager Questions: --> Which employee's manager do you wish to update? (List of employees from DB) Which employee do you wish to set as manager for selected employee? (List of employees from DB)
-- Update Employee Role Questions: --> Which employee's role do you wish to update? (List of employees from DB) Which role do you wish to set for employee? (List of roles from DB)
-- View All Employees by Department --> Select a Department (List from DB) 
-- View All Employees by Manager --> Select a Manager (List from DB) 
-- Departments: Sales, Engineering, Finance, Legal