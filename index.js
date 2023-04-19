const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./config/connection");

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
  const queryAll = `SELECT departments.id AS ID, departments.department_name AS Department FROM departments ORDER BY departments.id`;
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
  const queryAll = `SELECT employees.id AS 'ID', employees.first_name AS 'First Name', employees.last_name as 'Last Name', roles.job_title AS 'Title', departments.department_name AS 'Department', roles.salary AS 'Salary', CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager' FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id ORDER BY employees.id`;
  connection.query(queryAll, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// Add department
const addDepartment = () => {
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
const addEmployee = () => {
  const queryAllRoles = `SELECT roles.id, roles.job_title FROM roles`;
  const queryAllManagers = `SELECT employees.id, employees.first_name, employees.last_name, roles.job_title FROM employees LEFT JOIN roles ON employees.role_id = roles.id WHERE roles.job_title LIKE '%Manager%'`;

  connection.query(queryAllRoles, (err, resRoles) => {
    if (err) throw err;

    connection.query(queryAllManagers, (err, resManagers) => {
      if (err) throw err;

      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: "What is the first name of the employee?",
          },
          {
            name: "lastName",
            type: "input",
            message: "What is the last name of the employee?",
          },
          {
            name: "role",
            type: "list",
            pageSize: 15,
            message: "What is the role of the employee?",
            choices: resRoles.map((role) => ({
              name: role.job_title,
              value: role.id,
            })),
          },
          {
            name: "manager",
            type: "list",
            message: "Who is the manager of the employee?",
            choices: resManagers.map((manager) => ({
              name: `${manager.first_name} ${manager.last_name}`,
              value: manager.id,
            })),
          },
        ])
        .then((answer) => {
          const queryAdd = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.role}', '${answer.manager}')`;

          connection.query(queryAdd, (err, res) => {
            if (err) throw err;
            console.log("Employee added!");
            viewAllEmployees();
          });
        });
    });
  });
};

// Update employee role
const updateEmployeeRole = () => {
  const queryAllEmployees = `SELECT employees.id, employees.first_name, employees.last_name, roles.job_title FROM employees LEFT JOIN roles ON employees.role_id = roles.id`;
  const queryAllRoles = `SELECT roles.id, roles.job_title FROM roles`;

  connection.query(queryAllEmployees, (err, resEmployees) => {
    if (err) throw err;

    connection.query(queryAllRoles, (err, resRoles) => {
      if (err) throw err;

      inquirer
        .prompt([
          {
            name: "employee",
            type: "list",
            message: "Which employee's role do you want to update?",
            choices: resEmployees.map((employee) => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
            })),
          },
          {
            name: "role",
            type: "list",
            message: "What is the new role of the employee?",
            choices: resRoles.map((role) => ({
              name: role.job_title,
              value: role.id,
            })),
          },
        ])
        .then((answer) => {
          const queryUpdate = `UPDATE employees SET role_id = '${answer.role}' WHERE id = '${answer.employee}'`;

          connection.query(queryUpdate, (err, res) => {
            if (err) throw err;
            console.log("Employee role updated!");
            viewAllEmployees();
          });
        });
    });
  });
};

start();
