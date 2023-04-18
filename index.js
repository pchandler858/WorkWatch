const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./config/connection");
const figlet = require("figlet");

figlet.text(
  "Work",
  {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
  },
  (err, Work) => {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    figlet.text(
      "Watch",
      {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
      },
      (err, Watch) => {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        console.log(`${Work}\n${Watch}`);
      }
    );
  }
);

connection
  .authenticate()
  .then(() => {
    console.log("connected to database");
    start();
  })
  .catch((err) => {
    console.log("failed to connect to database", err);
  });

// Start function
const start = () => {
  inquirer
    .prompt([
      {
        name: "menu",
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
      },
    ])
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
};

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
