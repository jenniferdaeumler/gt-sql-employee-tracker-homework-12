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
  password: "password",
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
          "View All Roles",
          "View All Departments",
          "Add Employee",
          "Add Role",
          "Add Department",
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
        viewEmpDept();
      }
      //If 'View All Employees by Manager' is selected, call viewManager() function
      else if (answer.action === "View All Employees by Manager") {
        // console.log("View All Employees by Manager Selected")
        viewManager();
      }
      //If 'View All Roles' is selected, call viewRoles() function
      else if (answer.action === "View All Roles") {
        // console.log("Add Employee Selected")
        viewRoles();
      }
      //If 'View All Departments' is selected, call viewDepartments() function
      else if (answer.action === "View All Departments") {
        // console.log("Add Employee Selected")
        viewDepartments();
      }
      //If 'Add Employee' is selected, call addEmployee() function
      else if (answer.action === "Add Employee") {
        // console.log("Add Employee Selected")
        addEmployee();
      }
      //If 'Add Role' is selected, call addRole() function
      else if (answer.action === "Add Role") {
        // console.log("Add role");
        addRole();
      }
      //If 'Add Department' is selected, call updateRole() function
      else if (answer.action === "Add Department") {
        // console.log("Add Department");
        addDepartment();
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
function viewEmpDept() {
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

//Add Role
function addRole() {
  const selectRolesQuery = "select * from role";
  const selectDepartmentQuery = "select * from department";

  connection.query(selectRolesQuery, function (err, roleData) {
    if (err) console.log(err);

    connection.query(selectDepartmentQuery, function (err, departmentData) {
      if (err) console.log(err);

      const roles = roleData.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });

      const departments = departmentData.map((department) => {
        return {
          name: department.name,
          value: department.id,
        };
      });

      inquirer
        .prompt([
          {
            type: "input",
            name: "roleId",
            message: "What role would you like to add?",
            choices: roles
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary of this role (NO commas or $ sign)?",
          },
          {
            type: "list",
            name: "departmentId",
            message: "What department would you like this role to?",
            choices: departments,
          },
        ])
        .then(function (responses) {
          const roleInsertQuery = `insert into role (title, salary, department_id) values ("${responses.roleId}", ${responses.salary},${responses.departmentId})`;

          connection.query(roleInsertQuery, function (err, data) {
            if (err) console.log(err);
            userPrompt();
          });
        });
    });
  });
}

//Add Department
function addDepartment() {
  const selectDepartmentQuery = "select * from department";

  connection.query(selectDepartmentQuery, function (err, departmentData) {
    if (err) console.log(err);


    const departments = departmentData.map((department) => {
      return {
        name: department.name,
        value: department.id,
      };
    });

    inquirer
      .prompt([
        {
          type: "input",
          name: "roleId",
          message: "What department would you like to add?",
          choices: departments
        }
      ])
      .then(function (responses) {
        const departmentInsertQuery = `insert into department (name) values ("${responses.roleId}")`;

        connection.query(departmentInsertQuery, function (err, data) {
          if (err) console.log(err);
          userPrompt();
        });
      });
  });
}

//View All Roles
function viewRoles() {
  const viewAllRoles = `SELECT role.title AS Role, role.salary AS Salary, role.department_ID AS Department FROM role ORDER BY role.title DESC;`;
  connection.query(viewAllRoles, function (err, data) {
    if (err) throw err;
    console.table(data);
    userPrompt();
  });
}

//View All Departments
function viewDepartments() {
  const viewAllDepartments = `SELECT department.name AS Departments FROM department ORDER BY department.name ASC;`;
  connection.query(viewAllDepartments, function (err, data) {
    if (err) throw err;
    console.table(data);
    userPrompt();
  });
}