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
        start();
      }
    );
  }
);

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
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Update employee role":
          updateEmployeeRole();
          break;
        case "Exit":
          connection.end();
          console.log("Bye!");
          break;
      }
    });
};

// function addEmployee() {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         message: "What is the employee's first name?",
//         name: "firstName",
//       },
//       {
//         type: "input",
//         message: "What is the employee's last name?",
//         name: "lastName",
//       },
//       {
//         type: "input",
//         message: "What is the employee's role ID?",
//         name: "roleID",
//       },
//       {
//         type: "input",
//         message: "What is the employee's manager ID?",
//         name: "managerID",
//       },
//     ])
//     .then((answer) => {
//       Employee.create({
//         first_name: answer.firstName,
//         last_name: answer.lastName,
//         role_id: answer.roleID,
//       })
//         .then(() => {
//           console.log("employee added");
//         })
//         .catch((err) => {
//           console.log("failed to add employee", err);
//         });
//     })
//     .catch((err) => {
//       console.log("failed to prompt user for employee details", err);
//     });
// }
