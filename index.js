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
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Exit":
          connection.end();
          console.log("Bye!");
          break;
      }
    });
};

// View all departments
viewAllDepartments = () => {
  const queryAll = `SELECT departments.id, departments.department_name AS department FROM departments ORDER BY departments.id`;
  connection.query(queryAll, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// View all roles
viewAllRoles = () => {
  const queryAll = `SELECT roles.id AS 'ID', roles.job_title AS 'Job Title', roles.salary AS "Salary", departments.department_name AS Department FROM roles INNER JOIN departments ON roles.department_id = departments.id ORDER BY roles.id`;
  connection.query(queryAll, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// View all employees
viewAllEmployees = () => {
  const queryAll = `SELECT employees.id, employees.first_name, employees.last_name, roles.job_title AS title, departments.department_name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id ORDER BY employees.id`;
  connection.query(queryAll, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// Add department
addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the department?",
      },
    ])
    .then(
      (body = (answer) => {
        const queryAdd = `INSERT INTO departments (department_name) VALUES ('${answer.department}')`;
        const params = [body.department];
        connection.query(queryAdd, params, (err, res) => {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          console.log("Department added!");
          viewAllDepartments();
        });
      })
    );
};

// Add role
const addRole = () => {
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the title of the role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of the role?",
        },
        {
          name: "department",
          type: "list",
          message: "What is the department of the role?",
          choices: res.map((department) => ({
            name: department.department_name,
            value: department.id,
          })),
        },
      ])
      .then(
        (body = (answer) => {
          const queryAdd = `INSERT INTO roles (job_title, salary, department_id) VALUES ('${answer.title}', '${answer.salary}', '${answer.department}')`;
          const params = [body.title, body.salary, body.department];
          connection.query(queryAdd, params, (err, res) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            }
            console.log("Role added!");
            viewAllRoles();
          });
        })
      );
  });
};

// Add employee
