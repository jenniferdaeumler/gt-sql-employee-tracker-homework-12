var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Gracie19!",
  database: "employee_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
//   functionName();
connection.end();
});


//Start inquirer prompt
//**Q: What would you like to do? O:View All Employees, View All Employees by Department, View All Employees by Manager,Add Employee, Remove Employee, Update Employee Role, Update Employee Manager
//Add Employee Questions--> What is the employee's first name? What is the employee's last name? What is the employee's role? (List of options: Sales Lead, Salesperson, Lead Engineer, Software Engineer, Account Manager, Accountant, Legal Team Lead, Lawyer) Who is the employee's manager? (List of manager options from DB)
//Remove Employee Questions: --> Which employee do you wish to remove? (List of employees from DB)
//Update Employee Manager Questions: --> Which employee's manager do you wish to update? (List of employees from DB) Which employee do you wish to set as manager for selected employee? (List of employees from DB)
//Update Employee Role Questions: --> Which employee's role do you wish to update? (List of employees from DB) Which role do you wish to set for employee? (List of roles from DB)
//View All Employees by Department --> Select a Department (List from DB) 
//View All Employees by Manager --> Select a Manager (List from DB) 
//Departments: Sales, Engineering, Finance, Legal