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
      else if(answer.action === "View All Employees by Department"){
        // console.log("View All Employees by Department Selected")
        viewDept();
      }
      //If 'View All Employees by Manager' is selected, call viewManager() function
      else if(answer.action === "View All Employees by Manager"){
        console.log("View All Employees by Manager Selected")
      }
      //If 'Add Employee' is selected, call addEmployee() function
      else if(answer.action === "Add Employee"){
        console.log("Add Employee Selected")
      }
      //If 'Remove Employee' is selected, call removeEmployee() function
      else if(answer.action === "Remove Employee"){
        console.log("Remove Employee Selected")
      }
      //If 'Update Employee Role' is selected, call updateRole() function
      else if(answer.action === "Update Employee Role"){
        console.log("Update Employee Role Selected")
      }
      //If 'Update Employee Manager' is selected, call updateManager() function
      else if(answer.action === "Update Employee Manager"){
        console.log("Update Employee Manager Selected")
      }
      //If 'Exit' is selected, return userPrompt()
      else{
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

function viewDept(){
//Variable for left join to view employee by department
const viewDepartmentJoin = `SELECT department.name AS department, employee.first_name AS first, employee.last_name AS last, employee.id
FROM employee
LEFT JOIN role 
ON employee.role_id = role.id
LEFT JOIN department 
ON role.department_id = department.id;`
connection.query(viewDepartmentJoin, function(err, data){
  if (err) throw (err);
  console.table(data);
})
};

