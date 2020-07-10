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
        choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "Exit"]
      }
    ])
    .then(function (answer) {
      // console.log(answer.action)
      //Conditional for selected action
      if (answer.action === "View All Employees") {
        //If 'View All Employees' is selected, call viewAll() function
        viewAll();
      }
      //If 'View All Employees by Dept' is selected, call viewDept() function
      else if (answer.action === "View All Employees by Department") {
        // console.log("View All Employees by Department Selected")
        viewDept();
      }
      //If 'View All Employees by Manager' is selected, call viewManager() function
      else if (answer.action === "View All Employees by Manager") {
        // console.log("View All Employees by Manager Selected")
        viewManager()
      }
      //If 'Add Employee' is selected, call addEmployee() function
      else if (answer.action === "Add Employee") {
        // console.log("Add Employee Selected")
        addEmployee()
      }
      //If 'Remove Employee' is selected, call removeEmployee() function
      else if (answer.action === "Remove Employee") {
        console.log("Remove Employee Selected")
        removeEmployee()
      }
      //If 'Update Employee Role' is selected, call updateRole() function
      else if (answer.action === "Update Employee Role") {
        console.log("Update Employee Role Selected")
      }
      //If 'Update Employee Manager' is selected, call updateManager() function
      else if (answer.action === "Update Employee Manager") {
        console.log("Update Employee Manager Selected")
      }
      //If 'Exit' is selected, return userPrompt()
      else {
        console.log("Exit Selected")
        return userPrompt();
      }
      connection.end();
    })
};

//Create function to view all employees
function viewAll() {
  //Variable for left join to display all employees
  const allEmployeeJoin = `SELECT employee.id, employee.first_name AS first, employee.last_name AS last, role.title AS role, department.name AS department, role.salary, employee.manager_id
FROM employee
LEFT JOIN role 
ON employee.role_id = role.id
LEFT JOIN department 
ON role.department_id = department.id;`
  connection.query(allEmployeeJoin, function (err, data) {
    if (err) throw err;
    console.table(data);
  })
};

//Create function to view all employees by department
function viewDept() {
  //Variable for left join to view employee by department
  const viewDepartmentJoin = `SELECT department.name AS department, employee.first_name AS first, employee.last_name AS last, employee.id
FROM employee
LEFT JOIN role 
ON employee.role_id = role.id
LEFT JOIN department 
ON role.department_id = department.id;`
  connection.query(viewDepartmentJoin, function (err, data) {
    if (err) throw (err);
    console.table(data);
  })
};

//Create function to view all employees by department
function viewManager() {
  //Variable for left join to view employee by department
  const viewManagerJoin = `
  SELECT employee.id, 
  employee.first_name AS Name, 
  employee.last_name AS "Last Name" , 
  CONCAT(manager.first_name, " ", manager.last_name) as "Manager Name",
  employee.manager_id AS "Manager ID"
  FROM employee employee
  LEFT JOIN employee manager 
  ON employee.manager_id = manager.id
  ;`
  connection.query(viewManagerJoin, function (err, data) {
    if (err) throw (err);
    console.table(data);
  })
};

//Add Employee Function
function addEmployee() {
  connection.query(`SELECT employee.manager_id FROM employee WHERE employee.manager_id 
          IS NOT NULL;`, function (err, res) {
    if (err) throw err;
    //New prompts:
    inquirer
      .prompt([
        {
          name: "firstname",
          type: "input",
          message: "What is the employee's first name?",
        },
        {
          name: "lastname",
          type: "input",
          message: "What is the employee's last name?",
        },
        {
          name: "role",
          type: "list",
          message: "What is the employee's role?",
          choices: ["Sales Lead", "Sales Person", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"]
        },
        {
          name: "manager",
          type: "list",
          message: "Who is the employee's manager?",
          choices: function () {
            const choicesArray = [];
            for (let i = 0; i < res.length; i++) {
              choicesArray.push(res[i].manager_id);
            }
            return choicesArray;
            // console.log(choicesArray);
          }

        }]
      ).then(function (answers) {
        console.log(answers);
        if (err) throw err;
        console.table(answers);
      })
  })
  // connection.end(); process.exit();
};

//Variable for INSERT INTO employee
//comment out below to work kind of
// const insertIntoEmployee = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
//     VALUES (?,?,?,?);
//     `;
// connection.query(insertIntoEmployee, choicesArray,
//   function (err, data) {
//     if (err) throw err;
//     console.table(data);
//   })
// connection.end(); process.exit();



//Is it because of my two connections going at same time? }) on 176 may be issue?

function removeEmployee() {
  connection.query(`SELECT employee.id AS id, employee.first_name, employee.last_name`, function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "delete",
          type: "list",
          message: "Which employee do you wish to delete?",
          choices: function () {
            let choicesArray = [];
            for (let i = 0; i < res.length; i++) {
              choicesArray.push(res[i].id);
            }
            return choicesArray;
            // console.log(choicesArray);
          }

        }])
  })
}