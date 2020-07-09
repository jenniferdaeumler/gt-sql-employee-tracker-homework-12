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
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  userPrompt();
});

//Start inquirer prompts
//What would you like to do list?
function userPrompt() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager"]
      }
    ])
    .then(function (answer) {
      console.log(answer.action)
      //Conditional for selected action
      if (answer.action === "View All Employees") {
        //If 'View All Employees' is selected, call viewAll() function
        viewAll();
      }
      connection.end();
    })
};

//Create function to view all employees
function viewAll() {
  //Variable for inner join to display all employees
  const leftJoin = `SELECT employee.id, employee.first_name AS first, employee.last_name AS last, role.title AS role, department.name AS department, role.salary, employee.manager_id
FROM employee
LEFT JOIN role 
ON employee.role_id = role.id
LEFT JOIN department 
ON role.department_id = department.id;`
  connection.query(leftJoin, function (err, data) {
    if (err) throw err;
    console.table(data);
  })
};

