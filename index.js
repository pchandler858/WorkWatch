const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./config/connection");

const { viewAllDepartments, addDepartment } = require("./modules/departments");
const { viewAllRoles, addRole } = require("./modules/roles");
const {
  viewAllEmployees,
  addEmployee,
  updateEmployeeRole,
} = require("./modules/employees");

console.log(`

██     ██  ██████  ██████  ██   ██         
██     ██ ██    ██ ██   ██ ██  ██          
██  █  ██ ██    ██ ██████  █████           
██ ███ ██ ██    ██ ██   ██ ██  ██          
 ███ ███   ██████  ██   ██ ██   ██         
                                           
                                           
██     ██  █████  ████████  ██████ ██   ██ 
██     ██ ██   ██    ██    ██      ██   ██ 
██  █  ██ ███████    ██    ██      ███████ 
██ ███ ██ ██   ██    ██    ██      ██   ██ 
 ███ ███  ██   ██    ██     ██████ ██   ██ 
                                           
                                           
                           
`);

// Start function
const start = () => {
  inquirer
    .prompt([
      {
        name: "menu",
        type: "list",
        message: "What would you like to do?",
        name: "start",
        pageSize: 10,
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.start) {
        case "View all departments":
          viewAllDepartments(start);
          break;
        case "View all roles":
          viewAllRoles(start);
          break;
        case "View all employees":
          viewAllEmployees(start);
          break;
        case "Add a department":
          addDepartment(start);
          break;
        case "Add a role":
          addRole(start);
          break;
        case "Add an employee":
          addEmployee(start);
          break;
        case "Update an employee role":
          updateEmployeeRole(start);
          break;
        case "Exit":
          connection.end();
          console.log("See you later!!!");
          break;
      }
    });
};

start();
