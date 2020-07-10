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
  database: "employee_DB",
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
        choices: [
          "View All Employees",
          "View All Employees by Department",
          "View All Employees by Manager",
          "Add Employee",
          "Update Employee Role",
          "Exit",
        ],
      },
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
        viewManager();
      }
      //If 'Add Employee' is selected, call addEmployee() function
      else if (answer.action === "Add Employee") {
        // console.log("Add Employee Selected")
        addEmployee();
      }
      //If 'Remove Employee' is selected, call removeEmployee() function
      else if (answer.action === "Remove Employee") {
        console.log("Remove Employee Selected");
        removeEmployee();
      }
      //If 'Update Employee Role' is selected, call updateRole() function
      else if (answer.action === "Update Employee Role") {
        console.log("Update Employee Role Selected");
      }
      //If 'Update Employee Manager' is selected, call updateManager() function
      else if (answer.action === "Update Employee Manager") {
        console.log("Update Employee Manager Selected");
      }
      //If 'Exit' is selected, return userPrompt()
      else {
        console.log("Exit Selected");
        connection.end();
      }
      
    });
}

//Create function to view all employees
function viewAll() {
  //Variable for left join to display all employees
  const allEmployeeJoin = `SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) as "Employee", 
  role.title AS Role, department.name AS Department, role.salary AS Salary, CONCAT(manager.first_name, " ", manager.last_name) as "Manager Name",employee.manager_id AS "Manager ID"
  FROM employee
  LEFT JOIN role 
  ON employee.role_id = role.id
  LEFT JOIN department 
  ON role.department_id = department.id
  LEFT JOIN employee manager 
    ON employee.manager_id = manager.id
  ORDER BY department DESC;`;
  connection.query(allEmployeeJoin, function (err, data) {
    if (err) throw err;
    console.table(data);
    userPrompt();
  });
}

//Create function to view all employees by department
function viewDept() {
  //Variable for left join to view employee by department
  const viewDepartmentJoin = `SELECT department.name AS department, CONCAT(employee.first_name, " ", employee.last_name) as "Employee" , employee.id
  FROM employee
  LEFT JOIN role 
  ON employee.role_id = role.id
  LEFT JOIN department 
  ON role.department_id = department.id
  ORDER BY department.name DESC;`;
  connection.query(viewDepartmentJoin, function (err, data) {
    if (err) throw err;
    console.table(data);
    userPrompt();
  });
}

//Create function to view all employees by department
function viewManager() {
  //Variable for left join to view employee by department
  const viewManagerJoin = `SELECT employee.manager_id AS "Manager ID",
  CONCAT(manager.first_name, " ", manager.last_name) as "Manager Name",
   employee.id AS "Employee ID",
   CONCAT(employee.first_name, " ", employee.last_name) as "Employee"
    FROM employee employee
    LEFT JOIN employee manager 
    ON employee.manager_id = manager.id
    WHERE employee.manager_id IS NOT NULL
    ORDER BY "Manager Name" DESC;`;
  connection.query(viewManagerJoin, function (err, data) {
    if (err) throw err;
    console.table(data);
    userPrompt();
  });
}

//Add Employee Function
function addEmployee() {
  /*const selectManagerQuery = `
  SELECT DISTINCT employee.manager_id AS "Manager ID", 
  CONCAT(manager.first_name, " ", manager.last_name) as "Manager"
  FROM employee employee
  LEFT JOIN employee manager 
  ON employee.manager_id = manager.id
  WHERE employee.manager_id IS NOT NULL
  ;`*/

  const selectEmployeeQuery = "select * from employee";
  const selectRolesQuery = "select * from role";

  connection.query(selectEmployeeQuery, function (err, employeeData) {
    if (err) console.log(err);

    connection.query(selectRolesQuery, function (err, roleData) {

      if (err) console.log(err);
      const roles = roleData.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });

      const employees = employeeData.map((employee) => {
        return {
          name: employee.first_name + " " + employee.last_name,
          value: employee.id,
        };
      });

      inquirer
        .prompt([
          {
            type: "list",
            name: "roleId",
            message: "What is this employees role?",
            choices: roles,
          },
          {
            type: "list",
            name: "managerId",
            message: "Who is this employee's manager?",
            choices: employees,
          },
          {
            type: "input",
            name: "fname",
            message: "what is the employee's first name",
          },
          {
            type: "input",
            name: "lname",
            message: "what is the employee's last name",
          },
        ])
        .then(function (responses) {
          const employeeInsertQuery = `insert into employee (first_name, last_name, role_id, manager_id) values ("${responses.fname}", "${responses.lname}",${responses.roleId},${responses.managerId} )`;

          connection.query(employeeInsertQuery, function (err, data) {
            if (err) console.log(err);
            userPrompt();
          });
        });
    });
  });
}

//Add department


//Add role