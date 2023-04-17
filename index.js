const inquirer = require("inquirer");
const mysql2 = require("mysql2");
const Employee = require("./models/Employees");

// set up connection to database
const db = mysql2.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_db",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

// Start function
function start() {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "start",
      choices: [
        "View all employees",
        "View all employees by department",
        "View all employees by manager",
        "Add employee",
        "Remove employee",
        "Update employee role",
        "Update employee manager",
        "View all roles",
        "Add role",
        "Remove role",
        "View all departments",
        "Add department",
        "Remove department",
        "Quit",
      ],
    })
    .then((answer) => {
      switch (answer.start) {
        case "View all employees":
          viewAllEmployees();
          break;
        case "View all employees by department":
          viewAllEmployeesByDepartment();
          break;
        case "View all employees by manager":
          viewAllEmployeesByManager();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Remove employee":
          removeEmployee();
          break;
        case "Update employee role":
          updateEmployeeRole();
          break;
        case "Update employee manager":
          updateEmployeeManager();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "Add role":
          addRole();
          break;
        case "Remove role":
          removeRole();
          break;
        case "View all departments":
          viewAllDepartments();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Remove department":
          removeDepartment();
          break;
        case "Exit":
          connection.end();
          console.log("Bye!");
          break;
      }
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName",
      },
      {
        type: "input",
        message: "What is the employee's role ID?",
        name: "roleID",
      },
      {
        type: "input",
        message: "What is the employee's manager ID?",
        name: "managerID",
      },
    ])
    .then((answer) => {
      Employee.create({
        first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: answer.roleID,
      })
        .then(() => {
          console.log("employee added");
        })
        .catch((err) => {
          console.log("failed to add employee", err);
        });
    })
    .catch((err) => {
      console.log("failed to prompt user for employee details", err);
    });
}
